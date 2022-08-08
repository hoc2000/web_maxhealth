import db from '../models/index';
import bcrypt from 'bcryptjs';
import { reject } from 'bcrypt/promises';
//Login

const salt = bcrypt.genSaltSync(10);

let hashPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hash = await bcrypt.hashSync(password, salt);
			resolve(hash);
		} catch (error) {
			reject(error);
		}
	});
};
let handleUserLogin = async (email, password) => {
	return new Promise(async (resolve, reject) => {
		let userData = {};

		try {
			let isEmailExist = await checkEmail(email);
			if (isEmailExist) {
				//checkpassword
				let user = await db.User.findOne({
					attributes: [ 'id', 'email', 'roleId', 'password', 'firstName', 'lastName' ],
					where: { email: email },
					raw: true
				});
				if (user) {
					let check = bcrypt.compareSync(password, user.password);
					//đúng ngay từ đầu
					if (check) {
						userData.code = 0;

						delete user.password;
						userData.user = user;
						//password sai
					} else {
						userData.code = 3;
						userData.message = 'Wrong password';
					}
					//email không tồn tại sau khi đã bị xóa
				} else {
					userData.code = 2;
					userData.message = 'Your email or username does not exist ';
				}
				//email không tồn tại
			} else {
				userData.code = 1;
				userData.message = 'Your email or username does not exist ';
			}

			resolve(userData);
		} catch (error) {
			reject(error);
		}
	});
};

let checkEmail = (userEmail) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: { email: userEmail }
			});
			if (user) {
				resolve(true);
			} else {
				resolve(false);
			}
		} catch (e) {
			reject(e);
		}
	});
};

//lay tat ca user
let getAllUsers = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = null;
			if (userId === 'ALL') {
				users = await db.User.findAll({
					attributes: {
						exclude: [ 'password' ]
					}
				});
			}
			if (userId && userId !== 'ALL') {
				users = await db.User.findOne({
					where: { id: userId },
					attributes: {
						exclude: [ 'password' ]
					}
				});
			}
			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};

let createUser = (data) => {
	
	return new Promise(async (resolve, reject) => {
		try {
			let check = await checkEmail(data.email);
			if (check === true) {
				resolve({
					code: 1,
					errMessage: 'Your email already existed'
				});
			} else {
				let hashPassWordFromBcrypt = await hashPassword(data.password);
				await db.User.create({
					email: data.email,
					password: hashPassWordFromBcrypt,
					firstName: data.firstName,
					lastName: data.lastName,
					address: data.address,
					gender: data.gender,
					phoneNumber: data.phoneNumber,
					positionId: data.positionId,
					roleId: data.roleId,
					image:data.avatar
					
				});

				resolve({
					code: 0,
					message: 'Successful'
				});
			}
		} catch (error) {
			reject(error);
		}
	});
};

let deleteUser = (uid) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: { id: uid }
			});

			if (!user) {
				resolve({
					code: 1,
					message: `User doesn't exist `
				});
			}

			await db.User.destroy({
				where: { id: uid }
			});

			resolve({
				code: 0,
				message: 'Delete successful'
			});
		} catch (error) {
			reject(error);
		}
	});
};
let updateUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id || !data.roleId || !data.positionId || !data.gender) {
				resolve({
					code: 2,
					message: 'Missing parameter'
				});
			}
			let user = await db.User.findOne({
				where: { id: data.id },
				raw: false
			});
			if (user) {
				user.firstName = data.firstName;
				user.lastName = data.lastName;
				user.address = data.address;
				user.gender = data.gender
                user.roleId = data.roleId
                user.positionId = data.positionId
                user.phoneNumber = data.phoneNumber

				if(data.avatar){
					user.image = data.avatar;
				}

				await user.save();

				resolve({
					code: 0,
					message: 'Update successful'
				});
			}

			resolve({
				code: 1,
				message: `User doesn't exist`
			});
		} catch (error) {
			reject(error);
		}
	});
};
let getAllCodeService = (typeInput) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!typeInput) {
				resolve({
					code: -2,
					message: 'Missing param'
				});
			} else {
				let res = {};
				let allcode = await db.Allcodes.findAll({
					where: { type: typeInput }
				});
				res.code = 0;
				res.data = allcode;
				resolve(res);
			}
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	handleUserLogin: handleUserLogin,
	getAllUsers: getAllUsers,
	createUser: createUser,
	deleteUser: deleteUser,
	updateUser: updateUser,
	getAllCodeService: getAllCodeService
};

import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrpyt = await hashUserPassword(data.password);
      //query insert
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrpyt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.Gender === "1" ? true : false,
        phoneNumber: data.phoneNumber,
        roleID: data.roleId,
      });
      resolve("ok tao user moi thanh cong");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
//lay tat ca hong tin user
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
//lay user theo id de update
let getUserById = async (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      //lenh orm findOne()
      let userById = await db.User.findOne({
        where: { id: uid },
        raw: true,
      });
      if (userById) {
        resolve(userById);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
//update data
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();
        let allusers = await db.User.findAll();
        resolve(allusers);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUserById = (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: uid },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};

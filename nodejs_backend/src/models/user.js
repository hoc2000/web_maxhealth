'use strict';
const { Model, BOOLEAN } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
		static associate(models) {
			User.belongsTo(models.Allcodes, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
			User.belongsTo(models.Allcodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
			User.hasOne(models.Markdown, { foreignKey: 'doctorId' })
			User.hasOne(models.Doctor_Info, { foreignKey: 'doctorId' })
			User.hasMany(models.Schedule, { foreignKey: 'doctorId', as: 'doctorData' })

			User.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' })
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			address: DataTypes.STRING,
			gender: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			image: DataTypes.STRING,
			roleId: DataTypes.STRING,
			positionId: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'User' // ten bang
		}
	);
	return User;
};

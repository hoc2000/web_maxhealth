'use strict';
const { Model, BOOLEAN } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Allcodes extends Model {
		/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
		static associate(models) {
			Allcodes.hasMany(models.User, { foreignKey: 'positionId', as: 'postionData' })
			Allcodes.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
			Allcodes.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })

			Allcodes.hasMany(models.Doctor_Info, { foreignKey: 'priceId', as: 'priceTypeData' })
			Allcodes.hasMany(models.Doctor_Info, { foreignKey: 'provinceId', as: 'provinceTypeData' })
			Allcodes.hasMany(models.Doctor_Info, { foreignKey: 'paymentId', as: 'paymentTypeData' })

			Allcodes.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeTypeDataPatient' })
		}
	}
	Allcodes.init(
		{
			keyMap: DataTypes.STRING,
			type: DataTypes.STRING,
			valueEN: DataTypes.STRING,
			valueVI: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Allcodes'
		}
	);
	return Allcodes;
};

const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hocvu', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  longging: false
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('ket noi db thanh cong.');
  } catch (error) {
    console.error('khong ket noi duoc db:', error);
  }
}
module.exports = connectDB;

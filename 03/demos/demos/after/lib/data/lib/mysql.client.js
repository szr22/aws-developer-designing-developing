const Sequelize = require('sequelize')

// const host = '/* TODO: Add database instance endpoint */'
const host = 'user.cfn0sfzydb8e.us-east-1.rds.amazonaws.com'
const database = 'user'
const username = 'admin'
const password = 'mypassword'

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 5000
  }
})

module.exports = sequelize

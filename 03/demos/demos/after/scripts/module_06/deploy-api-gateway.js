// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const apiG = new AWS.APIGateway()
// const apiId = '/* TODO: Add api id */'
const apiId = '68ngjo8rgl'

createDeployment(apiId, 'prod')
.then(data => console.log(data))

function createDeployment (apiId, stageName) {
  // TODO: Create params const
  const params = {
    restApiId: apiId,
    stageName: stageName
  }

  return new Promise((resolve, reject) => {
    // TODO: Create deployment
    apiG.createDeployment(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

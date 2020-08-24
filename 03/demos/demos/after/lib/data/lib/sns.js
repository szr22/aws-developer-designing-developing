const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

const sns = new AWS.SNS()
// const TOPIC_ARN = '/* TODO: Add your topic arn */'
const TOPIC_ARN = 'arn:aws:sns:us-east-1:180732999116:hamster-topic'

function publish (msg) {
  // TODO: Create params const object
  const params = {
    TopicArn: TOPIC_ARN,
    Message: msg
  }

  return new Promise((resolve, reject) => {
    // TODO: Publish message
    sns.publish(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = { publish }

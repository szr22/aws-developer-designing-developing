// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const autoScaling = new AWS.AutoScaling()
const asgName = 'hamsterASG'
const lcName = 'hamsterLC'
const policyName = 'hamsterPolicy'
// const tgArn = '/* TODO: get target group ARN */'
const tgArn = 'arn:aws:elasticloadbalancing:us-east-1:180732999116:targetgroup/hamsterTG/51ad9a5e69e6b027'

createAutoScalingGroup(asgName, lcName)
.then(() => createASGPolicy(asgName, policyName))
.then((data) => console.log(data))

function createAutoScalingGroup (asgName, lcName) {
  // TODO: Create an auto scaling group
  const params = {
    AutoScalingGroupName: asgName,
    AvailablilityZones: [
      'us-east-1a',
      'us-east-1b'
    ],
    TargetGroupARNs: [
      tgArn
    ],
    LaunchConfigurationName: lcName,
    MaxSize: 2,
    MinSize: 1
  }

  return new Promise((resolve, reject) => {
    autoScaling.createAutoScalingGroup(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function createASGPolicy (asgName, policyName) {
  // TODO: Create an auto scaling group policy
  const params = {
    AdjustmentType: 'ChangeInCapacity',
    AutoScalingGroupName: asgName,
    PolicyName: policyName,
    PolicyType: 'TargetTrackingScaling',
    TargetTrackingConfiguration: {
      TargetValue: 5,
      PredefinedMetricSpecification: {
        PredefinedMetricType: 'ASGAverageCPUUtilization'
      }
    }
  }

  return new Promise((resolve, reject) => {
    autoScaling.putScalingPolicy(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

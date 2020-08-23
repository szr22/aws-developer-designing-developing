// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const ec2 = new AWS.EC2()
// const volumeId = '/* TODO: Add the volume to detach/attach */'
const volumeId = 'vol-0bf3abc44b677fbc3'
// const instanceId = '/* TODO: Add the instance to attach to */'
const instanceId = 'i-04979c3f10286a3f8'

detachVolume(volumeId)
.then(() => attachVolume(instanceId, volumeId))

function detachVolume (volumeId) {
  // TODO: Configure detachVolume params
  const params = {
    VolumeId: volumeId
  }

  return new Promise((resolve, reject) => {
    // TODO: Detach the volume
    ec2.detachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function attachVolume (instanceId, volumeId) {
  // TODO: Configure attachVolume params
  const parames = {
    InstanceId: instanceId,
    VolumeId: volumeId,
    Device: '/dev/sdf'
  }

  return new Promise((resolve, reject) => {
    // TODO: Attach the volume
    ec2.attachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

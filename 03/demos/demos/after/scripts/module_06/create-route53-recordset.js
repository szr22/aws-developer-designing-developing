// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const route53 = new AWS.Route53()
// const hzId = '/* TODO: Add your hostedzone id */'
const hzId = '/hostedzone/Z2R1CQ04706J63'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  // TODO: Create params const
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html
  const params = {
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'hbfl.online',
            Type: 'A',
            AliasTarget: {
              DNSName: 'hamsterELB-956462610.us-east-1.elb.amazonaws.com',
              EvaluateTargetHealth: false,
              HostedZoneId: 'Z35SXDOTRQ7X7K'
            }
          }
        }
      ]
    }
  }

  return new Promise((resolve, reject) => {
    // TODO: Create record set
    route53.changeResourceRecordSets(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

# tadpoles-logger

For those who use the "Bright Horizons", or "MyDay", or any other app used by http://www.tadpoles.com, this app is to give a means of convenience for logging in your child.

## Usages

**First always change the logs you want to run (defaults to a diaper/wakup/feeding log combo) by modifying the `logbuilder.js` file**

You will need to pass your Bright Horizons sign-in credentials to any of the steps below by doing any of the below steps:
* Set the command line variables `-username` (`-u`) and `-password` (`-p`)
* Set the environment variables `BRIGHT_HORIZONS_USERNAME` and `BRIGHT_HORIZONS_PASSWORD`

### One-time login via command line
1. Setup the variables by either
	1. Setting the enviornment variable `TADPOLES_ONE_TIME_SETTING` to `true`
	1. Passing in the command line switches `-onetime` or `-o` switches

### Dash button login
1. Login to your dash button using the "Amazon" App, but **DON'T finish the final step to choose a product**
1. Follow the steps to find your dash device's MAC Address at ![the node-dash-button github](https://github.com/hortinstein/node-dash-button)
1. Setup the MAC Addressvariables by either
	1. Setting the enviornment variable `TADPOLES_DASH_MAC_ADDRESS` to the MAC Address found above
	1. Passing in the command line switches `-mac` or `-m` switches

### AWS SQS login
1. First setup your ![SQS Queue if you have not already](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/GettingSetUp.html)
1. Setup the following required variables from your AWS Queue (these are generally obtained from the SQS url)
	1. Via Command Line
    1. Pass in your `-awsUserId` (`-a`)
		1. Pass in your `-awsRegion` (`-r`)
		1. Pass in your `-awsQueueName` (`-q`)
	1. Via Environment Variables
	  1. Set the variable AWS_USER_ID
		1. Set the variable AWS_REGION
		1. Set the variable AWS_MAKER_SQS_QUEUE_NAME
1. Additionally you will need to setup the following environment variables
  1. Your AWS_ACCESS_KEY_ID
  1. Your AWS_SECRET_ACCESS_KEY

Finally, run the command via the command line `node app.js` followed by any command line arguments above if desired

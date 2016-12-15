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

For further details, see the example located at https://github.com/rguerra712/tadpoles-logger-example
#!/bin/sh

echo ENVIRONMENT_NAME: $ENVIRONMENT_NAME

case $ENVIRONMENT_NAME in

  Development)
    export API_HOST=http://methanesourcefinder-34f87bb24f8b2d4e.elb.us-west-2.amazonaws.com
    export API_PORT=8001
    export STATIC_HOST=http://methanesourcefinder-34f87bb24f8b2d4e.elb.us-west-2.amazonaws.com
    export STATIC_PORT=8002
  ;;

  UAT)
    export API_HOST=http://methanesourcefinder-34f87bb24f8b2d4e.elb.us-west-2.amazonaws.com
    export API_PORT=8001
    export STATIC_HOST=http://methanesourcefinder-34f87bb24f8b2d4e.elb.us-west-2.amazonaws.com
    export STATIC_PORT=8002
  ;;

  Production)
    export API_HOST=http://methanesourcefinder-34f87bb24f8b2d4e.elb.us-west-2.amazonaws.com
    export API_PORT=8001
    export STATIC_HOST=http://methanesourcefinder-34f87bb24f8b2d4e.elb.us-west-2.amazonaws.com
    export STATIC_PORT=8002
  ;;

  *)
  echo "Environenment not specified, please set $ENVIRONMENT_NAME to one of Development, UAT, or Production"
  exit
  ;;

esac

echo Config info:
echo API Host: $API_HOST
echo API Port: $API_PORT
echo Static Host: $STATIC_HOST
echo Static Port: $STATIC_PORT

envsubst < default.conf.template > default.conf

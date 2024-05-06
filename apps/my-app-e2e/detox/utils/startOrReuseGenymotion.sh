# Check to see if the Genymotion instance is already running.  If it is not, start it.
if [[ $(gmsaas instances list -q) ]]; then
  echo "Genymotion instance is already running."
else
  echo "Starting Genymotion instance..."
  gmsaas instances start 53d71621-b0b8-4e5a-8cea-0055ea98988f my-app-dev
fi
# Connect to the Genymotion instance.
gmsaas instances list -q | xargs -n1 gmsaas instances adbconnect
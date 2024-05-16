# Check to see if the Genymotion instance is already running.  If it is not, start it.
if [[ $(gmsaas instances list -q) ]]; then
  echo "Genymotion instance is already running."
else
  echo "Starting Genymotion instance..."
  gmsaas instances start 95016679-8f8d-4890-b026-e4ad889aadf1 my-app-dev
fi
# Connect to the Genymotion instance.
gmsaas instances list -q | xargs -n1 gmsaas instances adbconnect
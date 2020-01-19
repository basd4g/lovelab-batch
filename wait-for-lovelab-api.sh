#!/bin/sh
# wait-for-postgres.sh

set -e

cmd="$@"

curlStr='{"running":true,"message":"Hello,lovelab. This API server is running."}'
while test "$curlStr" != "$(curl -s http://lovelab-api:3000/api/v1)"
do
  >&2 echo 'lovelab-api is unavailable - sleeping'
  sleep 1
done

>&2 echo 'lovelab-api is up excuting command'
exec $cmd


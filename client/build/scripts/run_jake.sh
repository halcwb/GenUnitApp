#!/usr/bin/env bash
# Start up jake
# Pass through command line arguments

# make sure that node and npm are there
. ~/.nvm/nvm.sh

# First build npm if jake not exists
if [[ ! -f node_modules/.bin/jake ]]; then
    echo "Building npm modules:"    
    npm build
fi

DEBUG=app:* node_modules/.bin/jake $*
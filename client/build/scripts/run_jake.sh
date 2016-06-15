#!/usr/bin/env bash
# Start up jake
# Pass through command line arguments
DEBUG=*
[ ! -f node_modules/.bin/jake ] && echo "Building npm modules:" && npm rebuild
node_modules/.bin/jake $*
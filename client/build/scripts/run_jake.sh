#!/usr/bin/env bash
# Start up jake
# Pass through command line arguments
[ ! -f node_modules/.bin/jake ] && echo "Building npm modules:" && npm rebuild
DEBUG=jakefile node_modules/.bin/jake $*
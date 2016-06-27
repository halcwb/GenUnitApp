#!/usr/bin/env bash

set -eu
set -o pipefail

cd `dirname $0`

FSIARGS=""
OS=${OS:-"unknown"}
if [[ "$OS" != "Windows_NT" ]]
then
  FSIARGS="--fsiargs -d:MONO"
fi

function run() {
  if [[ "$OS" != "Windows_NT" ]]
  then
    mono "$@"
  else
    "$@"
  fi
}
#Only run the bootstrapper if no paket.exe
if [ ! -e .paket/paket.exe ]
	then
		run .paket/paket.bootstrapper.exe
fi

if [[ "$OS" != "Windows_NT" ]] &&
       [ ! -e ~/.config/.mono/certs ]
then
  mozroots --import --sync --quiet
fi

run .paket/paket.exe restore

[ ! -e build.fsx ] && run .paket/paket.exe update

# Ensure npm build of client if there is a client with a package.json
if [[ -d client ]] && [[ -f client/package.json ]] 
then
  echo "Building Client"
  cd client 
  npm install
  cd ..
fi

run packages/FAKE/tools/FAKE.exe "$@" $FSIARGS build.fsx


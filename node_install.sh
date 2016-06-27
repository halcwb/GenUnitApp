#!/usr/bin/env bash

# Get the current node version
if [[ ! -f node ]]; then
    echo "No node"
else 
    echo node version:
    node -v
    # Get the current npm version
    echo npm version:
    npm -v
fi

# node version is specified or latest stable
NODE_VERSION=${1:-"stable"}  
echo "Going to install: "$NODE_VERSION

# create bash_profile if not exists
touch ~/.bash_profile

# remove earier version of nvm
rm -rf ~/.nvm 

# get nvm
git clone https://github.com/creationix/nvm.git ~/.nvm 
cd ~/.nvm 
git checkout `git describe --abbrev=0 --tags`

# load nvm and install node version
source ~/.nvm/nvm.sh 
nvm install $NODE_VERSION

# Get the updated node version
echo node version:
node -v
# Get the updated npm version
echo npm version:
npm -v

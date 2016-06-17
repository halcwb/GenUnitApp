#!/usr/bin/env bash

sudo ~/.nvm/v0.10.36/bin/npm cache clean -f
sudo ~/.nvm/v0.10.36/bin/npm install -g n
sudo ~/.nvm/v0.10.36/lib/node_modules/n/bin/n 6.2.1
PATH=/usr/local/n/versions/node/6.2.1/bin:$PATH
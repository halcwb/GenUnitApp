#!/usr/bin/env bash

sudo ~/.nvm/v0.10.36/bin/npm cache clean -f
sudo ~/.nvm/v0.10.36/bin/npm install -g n
sudo ~/home/travis/.nvm/v0.10.36/lib/node_modules/n/bin/n stable

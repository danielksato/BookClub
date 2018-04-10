#!/bin/bash

cd nodeApp
node db/syncDB.js
toch db/data.sqlite
yarn start:prod

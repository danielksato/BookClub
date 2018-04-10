#!/bin/bash

cd nodeApp
node db/syncDB.js
yarn start:prod

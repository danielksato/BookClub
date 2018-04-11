#!/bin/bash

cd nodeApp
node db/syncDB.js
node db/dedupeDB.js
toch db/data.sqlite
yarn start:prod

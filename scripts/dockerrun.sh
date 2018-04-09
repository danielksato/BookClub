#!/bin/bash

cd nodeApp
node db/seedDB.js
yarn start:prod

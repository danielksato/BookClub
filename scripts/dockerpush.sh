#!/bin/bash

yarn build
docker build -t danielksato/book-brunch .
docker push danielksato/book-brunch
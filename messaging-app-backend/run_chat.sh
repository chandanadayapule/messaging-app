#!/usr/bin/env bash

echo $ENV

if [ $ENV == Prod ]; then
    echo "App running in prod mode"

else
    echo "App running in dev mode"
fi

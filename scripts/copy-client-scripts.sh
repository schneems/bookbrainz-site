#!/usr/bin/env bash

cp -R node_modules/bootstrap/less/ src/client/stylesheets/bootstrap
cp -R node_modules/font-awesome/less/ src/client/stylesheets/font-awesome
cp -R node_modules/react-select/less/ src/client/stylesheets/react-select
cp -R node_modules/react-virtualized-select/styles.css static/stylesheets/react-virtualized-select.css
cp -R node_modules/react-virtualized/styles.css static/stylesheets/react-virtualized.css

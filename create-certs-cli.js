#!/usr/bin/env node

/*global require,__dirname,process*/
(function withNode() {
  'use strict';

  const certificates = require('./index')
    , args = require('minimist')(process.argv.slice(2))
    , fs = require('fs')
    , path = require('path');

  if (!args.where) {

    throw new Error('You must provide a path');
  }

  let certificatesConfiguration = require(path.resolve(__dirname, 'config.json'))
    , toStore
    , keyStream = fs.createWriteStream(path.resolve(args.where, 'key.pem'))
    , certStream = fs.createWriteStream(path.resolve(args.where, 'cert.pem'));

  if (args &&
    args.name &&
    args.country &&
    args.state &&
    args.locality &&
    args.organization &&
    args['org-min']) {

    certificatesConfiguration = {
      'commonName': args.name,
      'countryName': args.country,
      'ST': args.state,
      'localityName': args.locality,
      'organizationName': args.organization,
      'OU': args['org-min']
    };
  }

  toStore = certificates(certificatesConfiguration);
  keyStream.write(toStore.key);
  keyStream.end();

  certStream.write(toStore.cert);
  certStream.end();
}());

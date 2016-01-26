/*global __dirname,require*/
(function withModule() {
  'use strict';

  const Hapi = require('hapi')
    , Inert = require('inert')
    , server = new Hapi.Server()
    , path = require('path')
    , publicFolder = path.resolve(__dirname, 'www')
    , certs = require('../index')
    , certificates = certs({
        'commonName': 'test.net',
        'countryName': 'Italy',
        'ST': 'Tuscany',
        'localityName': 'Follonica',
        'organizationName': 'test-company',
        'OU': 'test-company'
      });

  server.connection({
    'host': '0.0.0.0',
    'port': 3000,
    'tls': certificates
  });

  server.register(Inert, () => {

    server.route({
      'method': 'GET',
      'path': '/{param*}',
      'handler': {
        'directory': {
          'path': publicFolder,
          'listing': false
        }
      }
    });

    server.start(() => {

      console.log('Server running at:', server.info.uri);
    });
  });
}());

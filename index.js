/*global require,module,__dirname*/
(function withNode() {
  'use strict';

  const forge = require('node-forge')
    , path = require('path')
    , pki = forge.pki
    , keys = require('./lib/key-generation')(pki.rsa)
    , defaultConfigurations = require(path.join(__dirname, 'config.json'));

  module.exports = certificatesConfiguration => {

    const gen = () => {

      const conf = certificatesConfiguration || defaultConfigurations
        , certificate = require('./lib/certificate-creation')(pki, keys, conf)
        , pem = pki.certificateToPem(certificate)
        , keyPem = pki.privateKeyToPem(keys.privateKey);

      return {
        'key': keyPem,
        'cert': pem
      };
    };

    return {
      gen
    };
  };
}());

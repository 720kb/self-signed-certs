/*global require,module*/
(function withNode() {
  'use strict';

  const forge = require('node-forge')
    , pki = forge.pki
    , keys = require('./lib/key-generation')(pki.rsa);

  module.exports = certificatesConfiguration => {

    const conf = certificatesConfiguration || require('./config.json')
      , certificate = require('./lib/certificate-creation')(pki, keys, conf)
      , pem = pki.certificateToPem(certificate)
      , keyPem = pki.privateKeyToPem(keys.privateKey);

    return {
      'key': keyPem,
      'cert': pem
    };
  };
}());

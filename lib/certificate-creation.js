/*global module*/
(function withNode() {
  'use strict';

  module.exports = (pki, keys, conf) => {

    const cert = pki.createCertificate()
      , attributes = [{
          'name': 'commonName',
          'value': conf.commonName
        }, {
          'name': 'countryName',
          'value': conf.countryName
        }, {
          'shortName': 'ST',
          'value': conf.ST
        }, {
          'name': 'localityName',
          'value': conf.localityName
        }, {
          'name': 'organizationName',
          'value': conf.organizationName
        }, {
          'shortName': 'OU',
          'value': conf.OU
        }];

    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

    cert.setSubject(attributes);
    cert.setIssuer(attributes);

    cert.sign(keys.privateKey);

    return cert;
  };
}());

/*global module*/
(function withNode() {
  'use strict';

  module.exports = rsa => {

    return rsa.generateKeyPair({
      'bits': 2048
    });
  };
}());

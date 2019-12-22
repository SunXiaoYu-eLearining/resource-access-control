'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  app.factory = factory;

  // define user and default data
  factory.define('resources', app.model.Resource, {
    application_id: 12345,
    resource_name: factory.sequence('Resource.resource_name', n => `rs_${n}`),
    creator: 9284,
  });
};
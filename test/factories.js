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

  factory.define('applications', app.model.Application, {
    application_name: factory.sequence('Application.application_name', n => `APP-${n}`),
    api_key: factory.sequence('Application.api_key', n => `KEY-${n}`),
    creator: 9284,
    administrator: 9284,
  });
};
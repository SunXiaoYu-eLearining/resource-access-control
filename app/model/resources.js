'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Resource = app.model.define('resource', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    application_id: INTEGER,
    resource_name: STRING(64),
    creator: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return Resource;
};
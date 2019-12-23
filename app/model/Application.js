'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Application = app.model.define('application', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    application_name: STRING(64),
    api_key: STRING(128),
    creator: INTEGER,
    administrator: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return Application;
};
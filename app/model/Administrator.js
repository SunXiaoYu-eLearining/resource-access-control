'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Administrator = app.model.define('administrator', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    display_name: STRING(64),
    provider: STRING(64),
    email: STRING(128),
    provider_user_id: STRING(128),
    provider_user_name: STRING(128),
    created_at: DATE,
    updated_at: DATE,
  });

  return Administrator;
};
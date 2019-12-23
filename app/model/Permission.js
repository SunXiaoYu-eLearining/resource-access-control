'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Permission = app.model.define('permission', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    application_name: STRING(64),
    resource_id: INTEGER,
    group_id: INTEGER,
    permission: STRING(9),
    created_at: DATE,
    updated_at: DATE,
  });

  return Permission;
};
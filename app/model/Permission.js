'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Permission = app.model.define('permission', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    application_id: INTEGER,
    resource_id: INTEGER,
    group_id: INTEGER,
    owner: INTEGER,
    group: INTEGER,
    other: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return Permission;
};
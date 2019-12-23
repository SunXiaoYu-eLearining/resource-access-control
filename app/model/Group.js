'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Group = app.model.define('group', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    application_id: INTEGER,
    group_name: STRING(64),
    created_at: DATE,
    updated_at: DATE,
  });

  return Group;
};
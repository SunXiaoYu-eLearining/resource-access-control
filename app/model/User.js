'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    application_id: INTEGER,
    user_name: STRING(64),
    creator: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
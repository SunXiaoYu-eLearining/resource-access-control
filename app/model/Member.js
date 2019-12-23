'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Member = app.model.define('member', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    application_id: INTEGER,
    group_id: INTEGER,
    user_id: INTEGER,
    role: STRING(16),
    created_at: DATE,
    updated_at: DATE,
  });

  return Member;
};
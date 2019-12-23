'use strict';

const TABLE_NAME = 'members';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable(TABLE_NAME, {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      application_id: INTEGER,
      group_id: INTEGER,
      user_id: INTEGER,
      role: STRING(16),
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  }
};

'use strict';

let TABLE_NAME = 'users';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable(TABLE_NAME, {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      application_id: INTEGER,
      user_name: STRING(64),
      creator: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  }
};

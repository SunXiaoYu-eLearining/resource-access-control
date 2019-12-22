'use strict';

let TABLE_NAME = 'administrators';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable(TABLE_NAME, {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      display_name: STRING(64),
      provider: STRING(64),
      email: STRING(128),
      provider_user_id: STRING(128),
      provider_user_name: STRING(128),
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  }
};

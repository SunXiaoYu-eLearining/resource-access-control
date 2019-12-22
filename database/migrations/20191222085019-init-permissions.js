'use strict';

let TABLE_NAME = 'permissions';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable(TABLE_NAME, {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      application_name: STRING(64),
      resource_id: INTEGER,
      group_id: INTEGER,
      permission: STRING(9),
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  }
};

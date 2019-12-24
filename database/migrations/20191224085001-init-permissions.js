'use strict';

let TABLE_NAME = 'permissions';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable(TABLE_NAME, {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      application_id: INTEGER,
      resource_id: INTEGER,
      group_id: INTEGER,
      owner: INTEGER,
      group: INTEGER,
      other: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  }
};

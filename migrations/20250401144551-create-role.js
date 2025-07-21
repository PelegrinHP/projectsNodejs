'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
      ,
      codename: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('Roles', ['name'], {
      unique: true,
      name: 'unique_role_name'
    });
  },

  async down(queryInterface, Sequelize) {
    // Primero eliminar el índice antes de eliminar la tabla
    await queryInterface.removeIndex('Roles', 'unique_role_name');
    await queryInterface.dropTable('Roles');
  }
};

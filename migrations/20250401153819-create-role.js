'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // Nombre de la tabla referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

    // ✅ Agregar índice único después de crear la tabla
    await queryInterface.addIndex('Roles', ['userId', 'type'], {
      unique: true,
      name: 'unique_user_role'
    });
  },

  async down(queryInterface, Sequelize) {
    // Primero eliminar el índice antes de eliminar la tabla
    await queryInterface.removeIndex('Roles', 'unique_user_role');
    await queryInterface.dropTable('Roles');
  }
};

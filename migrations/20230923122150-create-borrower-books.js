"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("borrower_books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      borrowerId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "borrowers",
          key: "id",
          as: "borrowerId",
        },
      },
      bookId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "books",
          key: "id",
          as: "bookId",
        },
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("books");
  },
};

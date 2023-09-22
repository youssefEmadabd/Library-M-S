import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Book extends Model {
  public id!: number;
  public borrowerId!: number;
  public title!: string;
  public author!: string;
  public ISBN!: string;
  public quantity!: number;
  public shelfLocation!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    borrowerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'borrowers',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shelfLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'Books', // Change to the appropriate table name for sellers
    timestamps: false,
  }
);

// Sequelize hooks to update the timestamps automatically
Book.addHook('beforeCreate', (book: Book) => {
  book.createdAt = new Date();
  book.updatedAt = new Date();
});

Book.addHook('beforeUpdate', (book: Book) => {
  book.updatedAt = new Date();
});

export {Book};

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { Borrower } from './borrower.model';
import { BorrowerBook } from './borrowerBook.model';
class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public ISBN!: string;
  public quantity!: number;
  public shelfLocation!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books', // Change to the appropriate table name for sellers
    timestamps: false,
  }
);
Book.belongsToMany(Borrower, { through:BorrowerBook })
Borrower.belongsToMany(Book, { through:BorrowerBook });
// Sequelize hooks to update the timestamps automatically
Book.addHook('beforeCreate', (book: Book) => {
  book.created_at = new Date();
  book.updated_at = new Date();
});

Book.addHook('beforeUpdate', (book: Book) => {
  book.updated_at = new Date();
});

export { Book };

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { Borrower } from './borrower.model';
import { Book } from './book.model';

class BorrowerBook extends Model {
  public id!: number;
  public borrowerId!: number;
  public bookId!: number;
  public dueDate!: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

BorrowerBook.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dueDate:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    // borrowerId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'borrowers',
    //     key: 'id',
    //   },
    // },
    // bookId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'books',
    //     key: 'id',
    //   },
    // },
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
    modelName: 'BorrowerBooks',
    tableName: 'borrower_books', // Change to the appropriate table name for sellers
    timestamps: false,
  }
);


// Sequelize hooks to update the timestamps automatically
BorrowerBook.addHook('beforeCreate', (borrowerBook: BorrowerBook) => {
  borrowerBook.created_at = new Date();
  borrowerBook.updated_at = new Date();
});

BorrowerBook.addHook('beforeUpdate', (borrowerBook: BorrowerBook) => {
  borrowerBook.updated_at = new Date();
});

export {BorrowerBook};

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'
import { User } from './user.model';
import { Book } from './book.model';
import { BorrowerBook } from './borrowerBook.model';

class Borrower extends Model {
  public id!: number;
  public userId: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Borrower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
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
    modelName: 'Borrower',
    tableName: 'borrowers',
    timestamps: false,
  }
);
User.hasMany(Borrower, {foreignKey: 'userId'})
Borrower.belongsTo(User, {foreignKey: 'userId'})

// Sequelize hook to update the timestamps automatically
Borrower.addHook('beforeCreate', (borrower: Borrower) => {
  borrower.created_at = new Date();
  borrower.updated_at = new Date();
});

Borrower.addHook('beforeUpdate', (borrower: Borrower) => {
  borrower.updated_at = new Date();
});

export { Borrower };

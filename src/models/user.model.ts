import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
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
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);


// Sequelize hook to update the timestamps automatically
User.addHook('beforeCreate', (user: User) => {
  user.created_at = new Date();
  user.updated_at = new Date();
});

User.addHook('beforeUpdate', (user: User) => {
  user.updated_at = new Date();
});

export {User};

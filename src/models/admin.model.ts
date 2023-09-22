import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Admin extends Model {
  public id!: number;
  public userId!: number; // Foreign key for the User model
  public createdAt!: Date;
  public updatedAt!: Date;
}

Admin.init(
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
    modelName: 'Admin',
    tableName: 'admins',
    timestamps: false,
  }
);

Admin.addHook('beforeCreate', (admin: Admin) => {
  admin.createdAt = new Date();
  admin.updatedAt = new Date();
});

Admin.addHook('beforeUpdate', (admin: Admin) => {
  admin.updatedAt = new Date();
});

export {Admin};

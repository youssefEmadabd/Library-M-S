import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { User } from './user.model';

class Admin extends Model {
  public id!: number;
  public userId!: number; // Foreign key for the User model
  public created_at!: Date;
  public updated_at!: Date;
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
    modelName: 'Admin',
    tableName: 'admins',
    timestamps: false,
  }
);
User.hasMany(Admin, {foreignKey: 'userId'})
Admin.belongsTo(User, {foreignKey: 'userId'})

Admin.addHook('beforeCreate', (admin: Admin) => {
  admin.created_at = new Date();
  admin.updated_at = new Date();
});

Admin.addHook('beforeUpdate', (admin: Admin) => {
  admin.updated_at = new Date();
});

export {Admin};

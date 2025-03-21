import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes} from 'sequelize';
import { conn } from './conn';

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare username: string;
  declare password: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: conn,
  }
);
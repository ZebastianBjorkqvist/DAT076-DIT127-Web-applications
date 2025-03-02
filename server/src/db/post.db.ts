import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from './conn';
import { UserModel } from './user.db';

export class PostModel extends Model<InferAttributes<PostModel>, InferCreationAttributes<PostModel>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare text: string;
  declare author: ForeignKey<UserModel['id']>;
}

PostModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: false,
      primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
        type: DataTypes.BIGINT
    }
  },
  {
    sequelize,
  }
);
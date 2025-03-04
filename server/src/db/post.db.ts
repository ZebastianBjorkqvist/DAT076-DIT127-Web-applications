import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from './conn';
import { UserModel } from './user.db';

export class PostModel extends Model<InferAttributes<PostModel>, InferCreationAttributes<PostModel>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare text: string;
  declare author: ForeignKey<UserModel['username']>;
  declare topics: string[];
}

PostModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
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
        type: DataTypes.STRING
    },
    topics: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  },
  {
    sequelize,
  }
);
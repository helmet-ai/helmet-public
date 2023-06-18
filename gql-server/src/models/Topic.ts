import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table
class Topic extends Model {
  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  prompt: string;

  @Column(DataType.TEXT)
  file: string;
}

export default Topic;

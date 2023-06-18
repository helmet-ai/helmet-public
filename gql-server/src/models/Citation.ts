import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table
class Citation extends Model {
  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  body: string;

  @Column
  url: string;
}

export default Citation;

import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table
class Story extends Model {
  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  body: string;

  @Column
  positiveSentiment: number;

  @Column
  neutralSentiment: number;

  @Column
  negativeSentiment: number;

  @Column(DataType.TEXT)
  image_url: string;
}

export default Story;

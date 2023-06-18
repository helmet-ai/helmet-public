import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table
class StoryTopic extends Model {
  @Column
  story_id: number;

  @Column
  topic_id: number;

  @Column(DataType.TEXT)
  explanation: string;
}

export default StoryTopic;

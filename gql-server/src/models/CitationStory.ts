import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table
class CitationStory extends Model {
  @Column
  story_id: number;

  @Column
  citation_id: number;

  @Column(DataType.TEXT)
  explanation: string;
}

export default CitationStory;

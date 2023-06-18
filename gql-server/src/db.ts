import { Sequelize } from "sequelize-typescript";
import Citation from "./models/Citation";
import CitationStory from "./models/CitationStory";
import Story from "./models/Story";
import StoryTopic from "./models/StoryTopic";
import Topic from "./models/Topic";

const dialectOptions =
  process.env.DISABLE_SSL === "true"
    ? {}
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };

const sequelize = new Sequelize({
  database: process.env.DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: 5432,
  dialect: "postgres",
  dialectOptions: { ...dialectOptions },
});

sequelize.addModels([Topic, Story, Citation, CitationStory, StoryTopic]);

export default sequelize;

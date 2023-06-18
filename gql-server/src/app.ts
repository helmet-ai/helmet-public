import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "./api";
import cors from "cors";
import sequelize from "./db";
import express from "express";
import Topic from "./models/Topic";
import Story from "./models/Story";
import Citation from "./models/Citation";
import CitationStory from "./models/CitationStory";
import StoryTopic from "./models/StoryTopic";

const app = express();
const PORT = parseInt(process.env.PORT) || 3000;

app.get("/test", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("connection established");
    res.send("connection established");
  } catch (e) {
    console.log(e);
    res.send("connection failed:" + e);
  }
});

const server = new ApolloServer({ typeDefs, resolvers });
async function run() {
  await server.start();
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(`🚀  Server ready at: ${PORT}`);
  });

  try {
    await sequelize.authenticate();
    console.log("connection established");

    await Topic.sync({ alter: true });
    await Story.sync({ alter: true });
    await Citation.sync({ alter: true });
    await StoryTopic.sync({ alter: true });
    await CitationStory.sync({ alter: true });
    console.log("tables synced");
  } catch (e) {
    console.log(e);
  }
}
run();

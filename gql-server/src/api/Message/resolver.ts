import { Configuration, OpenAIApi } from "openai";

const apiKey = "#KEY";
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const messageResolvers = {
  Mutation: {
    async message(_, { messages }) {
      try {
        const chatCompletion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages,
        });
        const { role, content } = chatCompletion.data.choices[0].message;
        return { role, content };
      } catch (e) {
        console.log("err");
        console.log(e.response.data.error);
      }
    },
  },
};

export default messageResolvers;

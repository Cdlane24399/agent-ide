import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const agent = await client.agents.create({
  name: "CodeAssistant",
  instructions: "You are a code assistant. Respond with code when appropriate.",
  model: "gpt-4.1-mini"
});

export async function handleInput(userInput) {
  const thread = await client.beta.threads.create();
  await client.beta.threads.messages.create(thread.id, { role: "user", content: userInput });
  const run = await client.beta.threads.runs.create(thread.id, { agent_id: agent.id });
  const result = await client.beta.threads.runs.poll(thread.id, run.id);
  return result.output_text;
}

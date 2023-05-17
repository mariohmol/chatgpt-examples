import { Configuration, OpenAIApi } from "openai";

export async function getConnection() {
    const configuration = new Configuration({
        organization: "org-WtyFPNkQrZLsLMEZUink8wBU",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    console.log('getConnection: Returning connection');
    const response = await openai.listEngines();
    return openai;
}

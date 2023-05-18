import { Configuration, OpenAIApi } from "openai";

export async function getConnection() {
    const configuration = new Configuration({
        organization: "org-WtyFPNkQrZLsLMEZUink8wBU",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    console.log('getConnection: Returning connection');
   
    return openai;
}

export async function listEngines(openai: any) {
    const response = await openai.listEngines();
    return response.data.data;
}

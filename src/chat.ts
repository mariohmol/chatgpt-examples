import {  OpenAIApi } from "openai";

export async function createCompletion(openai: any ) {
    
    const response = await openai.createChatCompletion({
        model: "text-davinci-003",
        prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: ",
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
    });

    return response;
}
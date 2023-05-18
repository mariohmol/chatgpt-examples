

export async function createCompletion(openai: any, engines: Array<any> ) {
    
    const model = 'gpt-3.5-turbo'; //'text-davinci-003';

    if (!engines.find( (c: any) => c.id === model)) {
        console.error('Engine not available');
        return false;
    }
    const response = await openai.createChatCompletion({
        model,
        // prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: ",
        // temperature: 0.9,
        // max_tokens: 150,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0.6,
        // stop: [" Human:", " AI:"],
        // model: "text-davinci-003",
        messages: [{role: "user", content: "Hello world"}],
    });

    return response;
}
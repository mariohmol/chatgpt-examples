import dotenv from 'dotenv';
import { getConnection, listEngines } from './auth';
import { createCompletion } from './chat';

dotenv.config();
main();


async function main() {
    console.log('Starting script');

    let openapi;
    let engines: Array<any>;
    try {
        openapi = await getConnection();
        console.info("Connection made");

        engines = await listEngines(openapi);
        console.log('Total Engines Available: ' + engines.length)

        const response = await createCompletion(openapi, engines);
        console.log(JSON.stringify(response.data));
    } catch(e: any) {
        // console.log(e)
        console.error('ERRROR ------', e.message);
        return false;
    }

    console.info("Ending execution");
    return true;
}

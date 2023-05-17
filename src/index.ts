import dotenv from 'dotenv';
import { getConnection } from './auth';
import { createCompletion } from './chat';

dotenv.config();
main();


async function main() {
    console.log('Starting script');

    let openapi;
    try {
        openapi = await getConnection();
        console.info("Connection made")
    } catch(e: any) {
        console.error('ERRROR ------', e.message);
        return false;
    }

    const response = await createCompletion(openapi);
    console.log(response);
    return true;
}

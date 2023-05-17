import dotenv from 'dotenv';
import { getConnection } from './auth';

dotenv.config();
main();


async function main() {
    console.log('Starting script');

    try {
        await getConnection();
    } catch(e: any) {
        console.error('ERRROR ------', e.message);
    }
}

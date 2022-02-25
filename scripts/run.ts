import { main } from './main';

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.error({ err });
        process.exit(1);
    }
};

runMain();

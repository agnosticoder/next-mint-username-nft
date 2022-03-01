import { task } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/config';

const RINKEBY_PRIVATE_KEY = process.env.YOUR_PRIVATE_RINKEBY_ACCOUNT_KEY || '';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: '0.8.4',
    networks: {
        rinkeby: {
            url: process.env.YOUR_ALCHEMY_API_URL,
            accounts: [RINKEBY_PRIVATE_KEY],
        },
        hardhat:{
          chainId: 1337
        }
    },
    paths:{
      artifacts: './utils/artifacts'
    },
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default config;

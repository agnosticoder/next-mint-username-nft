import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import styles from '../styles/modules/App.module.scss';
import abi from '../utils/wavePortal.json';

//* Loading waveContract address from .env.local
// const waveContractAddress = process.env.NEXT_PUBLIC_WAVE_CONTRACT_ADDRESS;
const waveContractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const contractABI = abi.abi;

declare global {
    interface Window {
        ethereum: any | undefined
    }
}

const App = () => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [totalWaves, setTotalWaves] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const wallet = async () => {
        const { ethereum } = window;
        console.log({ ethereum });
        if (!ethereum) {
            console.log('Please install the Metamask Extenstion');
            return;
        }

        console.log('Congratulation, you already got Wallet, Thank you');

        //*Check if we are autherize to access user wallet
        const accounts: any[] = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length === 0) {
            console.log('No Authorized Account Found');
            return;
        }

        console.log('Found Authorized Account: ', accounts[0]);
        setCurrentAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const network = await provider.getNetwork();
        console.log({network});
        const signer = provider.getSigner();
        if (!waveContractAddress) return console.log('No Contract address found');
        const wavePortalContract = new ethers.Contract(waveContractAddress, contractABI, signer);
        // await wavePortalContract.wave();
        const count = await wavePortalContract.getTotalWaves();
        setTotalWaves(count.toNumber());
        console.log('Total Number of Waves', count.toNumber());
    };

    useEffect(() => {
        wallet().catch((err) => console.warn({ err }));
    }, []);


    const onConnectWallet = async () => {
        try {
            if (!window.ethereum) return alert('Get Metamask');
            const accounts: any[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log({ accounts });
            console.log('Connected', accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (err) {
            console.warn({ err });
        }
    };

    const onWave = async () => {
        try {
            setIsLoading(true);
            const { ethereum } = window;
            if(!ethereum) return console.log('Ethereum Object does not exist');

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            if(!waveContractAddress) return console.log('No Contract address found');
            const wavePortalContract = new ethers.Contract(waveContractAddress, contractABI ,signer)

            let count = await wavePortalContract.getTotalWaves();
            setTotalWaves(count.toNumber());
            console.log('Total Number of Waves before: ', count.toNumber());

            const waveTxn = await wavePortalContract.wave();
            console.log('Mining... ', waveTxn.hash);
            await waveTxn.wait();
            console.log('Minied: ', waveTxn.hash);
            
            count = await wavePortalContract.getTotalWaves();
            setTotalWaves(count.toNumber());
            console.log('Total Number of Waves after: ', count.toNumber());
            setIsLoading(false);
        } catch (err) {
            console.warn({err});
        }
    };

    return (
        <div className={styles.container}>
            {!currentAccount ? (
                <div className={styles.connectButtonWrapper}>
                    <button onClick={onConnectWallet}>Connect Wallet (Login)</button>
                </div>
            ) : (
                <div>
                    {isLoading && <div>Loading...</div>}
                    <div>
                        <button onClick={onWave}>Do you want to wave at me? 👋🏽</button>
                    </div>
                    <div>Total Waves: {totalWaves}</div>
                    <div className={styles.loggedInAccount}>Logged In Account: {currentAccount}</div>
                </div>
            )}
        </div>
    );
};

export default App;

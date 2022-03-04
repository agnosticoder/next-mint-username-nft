import { ethers } from 'ethers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import getBalance from '../../lib/getBalance';
import abi from '../../utils/artifacts/contracts/WavePortal.sol/WavePortal.json';

//* Loading waveContract address from .env.local
// const waveContractAddress = process.env.NEXT_PUBLIC_WAVE_CONTRACT_ADDRESS;
const waveContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractABI = abi.abi;


const useWallet = () => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [balance, setBalance] = useState('');

    const handleAccountsChanged = async (accounts: string[]) => {
        const { ethereum } = window;
        console.log('----------------------Event----------------------------')
        console.log('Event', {accounts});

        if (accounts.length === 0) {
            setIsConnected(false);
            setBalance('');
            setCurrentAccount('');
            setMessage('No Authorized Account Found');
            setIsLoading(false);
            return;
        }


        setMessage(`Found Authorized Account: ${accounts[0]}`);
        setIsConnected(true);
        setCurrentAccount(accounts[0]);


        console.log('Congratulation, you already got Wallet, Thank you');

        const balance = await getBalance({account:accounts[0], ethereum});
        setBalance(balance);
        setIsLoading(false);
        console.log('----------------------Event----------------------------')
}

    const wallet = async () => {
        try {
            setIsLoading(true);
            const { ethereum } = window;

            if (!ethereum) {
                setMessage('Please install the Metamask Extenstion');
                setIsLoading(false);
                return;
            }

            console.log('Congratulation, you already got Wallet, Thank you');

            //*Check if we are autherize to access user wallet
            const accounts: any[] = await ethereum.request({ method: 'eth_accounts' });
            console.log('First Render', { accounts });

            if (accounts.length === 0) {
                setMessage('No Authorized Account Found');
                setIsLoading(false);
                return;
            }

            setMessage(`Found Authorized Account: ${accounts[0]}`);
            setIsConnected(true);
            setCurrentAccount(accounts[0]);
            const balance = await getBalance({ account: accounts[0], ethereum });
            console.log({ balance });
            setBalance(balance);
            setIsLoading(false);

            ethereum.on('accountsChanged', handleAccountsChanged);

            //cleanup
            return () => ethereum.removeListener('accountsChanged', handleAccountsChanged);
        } catch (err:any) {
            console.warn({ err });
            err?.message && console.warn(err.message);
        }
    };

    const onConnectWallet = async () => {
        try {
            const {ethereum} = window;
            if (!ethereum) return alert('Get Metamask');
            const accounts: any[] = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log({ accounts });
            console.log('Connected', accounts[0]);
            setIsConnected(true);
            setCurrentAccount(accounts[0]);
            const balance = await getBalance({account: accounts[0], ethereum});
            setBalance(balance);
        } catch (err) {
            console.warn({ err });
        }
    };

    useEffect(() => {
        wallet().catch((err) => console.warn({ err }));
    }, []);

    return {onConnectWallet, message, isConnected, currentAccount, balance, isLoading, error}
};

export default useWallet;

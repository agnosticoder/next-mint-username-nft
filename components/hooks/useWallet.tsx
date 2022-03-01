import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import abi from '../../utils/artifacts/contracts/WavePortal.sol/WavePortal.json';

//* Loading waveContract address from .env.local
// const waveContractAddress = process.env.NEXT_PUBLIC_WAVE_CONTRACT_ADDRESS;
const waveContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractABI = abi.abi;

interface UseWalletProps {
    setTotalWaves: any
}

const useWallet = ({ setTotalWaves }: UseWalletProps) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const wallet = async () => {
        setIsLoading(true);
        const { ethereum } = window;
        console.log({ ethereum });
        if (!ethereum) {
            setMessage('Please install the Metamask Extenstion');
            setIsLoading(false);
            return;
        }

        console.log('Congratulation, you already got Wallet, Thank you');

        //*Check if we are autherize to access user wallet
        const accounts: any[] = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length === 0) {
            setMessage('No Authorized Account Found');
            setIsLoading(false);
            return;
        }

        setMessage(`Found Authorized Account: ${accounts[0]}`);
        setIsConnected(true);
        setCurrentAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        if (!waveContractAddress) return console.warn('No Contract address found');
        const wavePortalContract = new ethers.Contract(waveContractAddress, contractABI, signer);
        // await wavePortalContract.wave();
        const totlaWaves = await wavePortalContract.getTotalWaves();
        console.log('Total Waves: ', totlaWaves.toNumber());
        setIsLoading(false);
        setTotalWaves(totlaWaves.toNumber());
        console.log('Total Number of Waves', totlaWaves.toNumber());
    };

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

    useEffect(() => {
        wallet().catch((err) => console.warn({ err }));
    }, []);

    return {onConnectWallet, message, isConnected, currentAccount, isLoading, error}
};

export default useWallet;

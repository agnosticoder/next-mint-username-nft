import { FormEvent, useState } from 'react';
import styles from '../styles/modules/App.module.scss';
import abi from '../utils/artifacts/contracts/WavePortal.sol/WavePortal.json';
import ContractFund from './ContractFund';
import GetAllWaves from './GetAllWaves';
import useContract from './hooks/useContract';
import useWallet from './hooks/useWallet';

//* Loading waveContract address from .env.local
// const waveContractAddress = process.env.NEXT_PUBLIC_WAVE_CONTRACT_ADDRESS;
const waveContractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const contractABI = abi.abi;

const WavePortal = () => {
    const [totalWaves, setTotalWaves] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [waveMessage, setWaveMessage] = useState('');

    const {
        message,
        isConnected,
        onConnectWallet,
        currentAccount,
        error,
        isLoading: isRunning,
    } = useWallet({ setTotalWaves });
    const { contract: wavePortalContract } = useContract(contractABI, waveContractAddress);

    // console.log({message}, {isConnected}, {currentAccount}, {isRunning}, {message});

    const onWave = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (!wavePortalContract) {
                setIsLoading(false);
                return console.log('No Contract Found');
            }

            // const wavePortalContract = getContract({ethereum, contractABI, contractAddress: waveContractAddress})

            let totalWaves = await wavePortalContract.getTotalWaves();
            console.log({ totalWaves });
            setTotalWaves(totalWaves.toNumber());
            console.log('Total Number of Waves before: ', totalWaves.toNumber());

            const waveTxn = await wavePortalContract.wave(waveMessage, {gasLimit: 300000});
            console.log('Mining... ', waveTxn.hash);
            await waveTxn.wait();
            console.log('Minied: ', waveTxn.hash);

            totalWaves = await wavePortalContract.getTotalWaves();
            setTotalWaves(totalWaves.toNumber());
            console.log('Total Number of Waves after: ', totalWaves.toNumber());
            setIsLoading(false);
            setWaveMessage('');
        } catch (err: any) {
            console.warn({ err });
            console.log(err?.data?.message);
            setIsLoading(false);
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
                    <div style={{ backgroundColor: '#bbb', padding: '25px', borderRadius: '5px' }}>
                        <form onSubmit={onWave}>
                            <div>
                                <input
                                    style={{ width: '300px', height: '30px', marginBottom: '30px' }}
                                    type="text"
                                    value={waveMessage}
                                    onChange={(e) => setWaveMessage(e.currentTarget.value)}
                                    placeholder="Please write your message..."
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <button type="submit">Do you want to wave at me? 👋🏽</button>
                            </div>
                        </form>
                    </div>
                    <div>Total Waves: {totalWaves}</div>
                    <div className={styles.loggedInAccount}>Logged In Account: {currentAccount}</div>
                    <ContractFund totalWaves={totalWaves}/>
                    <GetAllWaves totalWaves={totalWaves}/>
                </div>
            )}
        </div>
    );
};

export default WavePortal;

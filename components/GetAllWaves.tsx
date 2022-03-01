import { useEffect, useState } from "react";
import useContract from "./hooks/useContract";
import abi from '../utils/artifacts/contracts/WavePortal.sol/WavePortal.json';
import { ethers } from "ethers";

const contractABI = abi.abi;
const waveContractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

const GetAllWaves = ({totalWaves}:{totalWaves: number}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [allWaves, setAllWaves] = useState('');

    const {contract:wavePortalContract} = useContract(contractABI, waveContractAddress)

    //todo: implement Solidity Event in this function, so that all waves get modified whenever smart contract state changes without refesh
    //* https://github.com/buildspace/buildspace-projects/blob/main/Solidity_And_Smart_Contracts/en/Section_4/Lesson_2_Finalize_Celebrate.md
    const onGetAllWaves = async () => {
        try {
            setIsLoading(true);
            if(!wavePortalContract){
                setIsLoading(false);
                return console.log('No Contract Found');
            }

            const allWaves = await wavePortalContract.getAllWaves();
            console.log({allWaves});
            const wavesCleaned:any[] = [];
            allWaves.forEach((wave:any) => {
                wavesCleaned.push({
                    waver: wave.waver,
                    message: wave.message,
                    time: new Date(wave.timestamp * 1000),
                    balance: ethers.utils.formatEther(wave.balance),
                    gotFreeEth: wave.isGotEth ? 'You got free Eth': 'Sorry, you didn\'t get free Eth try in 20s'
                })
            })
            setAllWaves(JSON.stringify(wavesCleaned, null, 2));
            setIsLoading(false);
        }catch(err){
            console.warn({err});
        }
    }

    useEffect(() => {
        onGetAllWaves();
    },[totalWaves])
    return (
        <>
            <button onClick={onGetAllWaves}>Get All Waves 🌊</button>
            {allWaves && <pre>{allWaves}</pre>}
        </>
    );
};

export default GetAllWaves;

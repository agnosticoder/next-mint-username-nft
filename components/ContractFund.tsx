import useContract from "./hooks/useContract";
import abi from '../utils/artifacts/contracts/WavePortal.sol/WavePortal.json';
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const waveContractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

const ContractFund = ({totalWaves}:{totalWaves: number}) => {
    const [contractBalance, setContractBalance] = useState('');

    const { contract } = useContract(abi.abi, waveContractAddress);

    const getContractFunds = async () => {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        if(!contract) return;
        const fund = await provider.getBalance(contract?.address);
        setContractBalance(ethers.utils.formatEther(fund));
    };

    useEffect(() => {
        getContractFunds();
    }, [totalWaves]);

    return (
        <div>
            <h1>Current Contract Fund</h1>
            {contractBalance && <h2>{contractBalance}</h2>}
        </div>
    );
};

export default ContractFund
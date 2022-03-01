import { Contract, ContractInterface } from "ethers";
import { useEffect, useState } from "react";
import getContract from "../../lib/getContract";

const useContract = (contractABI:ContractInterface, contractAddress: string) => {
    const [contract, setContract] = useState<Contract | null>(null);

    useEffect(() => {
        const { ethereum } = window;
        const contract = getContract({ ethereum, contractABI, contractAddress: contractAddress });
        setContract(contract);
    }, [contractABI, contractAddress]);

    return {contract}
}

export default useContract;
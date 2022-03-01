import { ContractInterface, ethers } from "ethers";

interface GetContractProps{
    ethereum: any,
    contractAddress: string,
    contractABI: ContractInterface
}

const getContract = ({ethereum, contractAddress, contractABI}: GetContractProps) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
};

export default getContract;
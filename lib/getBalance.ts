import { ethers } from "ethers";

interface GetBalanceProps{
    ethereum: any,
    account: string
}

const getBalance = async ({ethereum, account}: GetBalanceProps) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const bal = await provider.getBalance(account);
    const balFormatted = ethers.utils.formatEther(bal);
    return balFormatted;
};

export default getBalance;
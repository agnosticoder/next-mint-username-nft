import useContract from "./hooks/useContract";
import abi from '../utils/artifacts/contracts/MintNFT.sol/MintNFT.json';
import { FormEvent, useEffect, useState } from "react";

const contractABI = abi.abi;
// const contractAddress = '0x04eD103b13Ea26353d08F5a488f7791956F641c6';
const contractAddress = '0x9742464006717af62e0767FA868Fe293BB55b4d4';

const MintUsernameContract = () => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { contract } = useContract(contractABI, contractAddress);


    const onGetContract = async () => {
        setIsLoading(true);
        if (!contract) return;
        const data = await contract.usernamesList('agnosticoder');
        console.log({ data });
        setIsLoading(false);
    };

    const onMintUsername = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            setIsLoading(true);
            if (!contract) return;
            console.log('Minting...');
            const txn = await contract.mintUsernameNFT(username);
            await txn.wait();

            console.log('Minting Done...');
            setIsLoading(false);
            setUsername('');
        } catch (err: any) {
            console.warn({ err });
            setIsLoading(false);
            setUsername('');
            err?.error?.message && setError(err.error.message);
            err?.message && setError(err.message);
        }
    };

    const setupEventLister = () => {
        console.log({contract});
        if (!contract) return;
        contract.on('NewEpicNFTMinted', (from, tokenId) => {
            console.log({ from }, { tokenId });
            console.log(`See NFT on Opensea: https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tokenId}`);
        });
        console.log('Event Added');

        if (contract) {
            return () => {
                contract.removeAllListeners();
                console.log('Event Removed');
            };
        }
    };

    useEffect(() => {
        return setupEventLister();
    }, [contract]);

    return (
        <>
            <h1>My NFT Username App with render here</h1>
            <button onClick={onGetContract}>Get Contract</button>
            <form onSubmit={onMintUsername}>
                <input
                    type="text"
                    placeholder="Enter your unique username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <button type="submit">Mint Your Username</button>
            </form>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
        </>
    );
};

export default MintUsernameContract;
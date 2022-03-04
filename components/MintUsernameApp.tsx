import useWallet from "./hooks/useWallet";
import MintUsernameContract from "./MintUsernameContract";

const MintUsernameApp = () => {
    const { isConnected, currentAccount, balance, isLoading, message, error, onConnectWallet } = useWallet();

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            {!isConnected && <button onClick={onConnectWallet}>Connect to Wallet</button>}
            {isConnected && (
                <>
                    <pre>Connected Account: {currentAccount}</pre>
                    <div>Balance: {balance} Eth</div>
                    <MintUsernameContract />
                </>
            )}
        </>
    );
};

export default MintUsernameApp;
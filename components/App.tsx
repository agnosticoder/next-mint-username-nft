import styles from '../styles/modules/App.module.scss';
import MintUsernameApp from './MintUsernameApp';
import WavePortal from './WavePortal';

declare global {
    interface Window {
        ethereum: any | undefined
    }
}

const App = () => {
    return (
        <div className={styles.container}>
            {/* <WavePortal /> */}
            {/* //todo: add some ENS_Polygon goodies to this app, switching connected wallet address, error handling, withdrwals etc.  */}
            <MintUsernameApp />
        </div>
    );
};

export default App;

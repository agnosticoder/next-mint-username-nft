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
            <MintUsernameApp />
        </div>
    );
};

export default App;

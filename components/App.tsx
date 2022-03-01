import styles from '../styles/modules/App.module.scss';
import Wave from './WavePortal';

declare global {
    interface Window {
        ethereum: any | undefined
    }
}

const App = () => {

    return (
        <div className={styles.container}>
            <Wave />
        </div>
    );
};

export default App;

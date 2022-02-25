import styles from '../styles/modules/App.module.scss';

const App = () => {

    const onWave = () => {
        console.log('Waved');
    }

    return (
        <div className={styles.container}>
            <button onClick={onWave}>Do you want to wave at me? 👋🏽</button>
        </div>
    );
};

export default App;

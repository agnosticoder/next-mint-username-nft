import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import styles from '../styles/modules/Layout.module.scss';

const Layout:FC = ({ children }) => (
    <div className={styles.container}>
        <Head>
            <title>App Title will go here</title>
        </Head>
        <div className="header">
            <div className="nav-container">
                <ul className="nav">
                    {/* <li>
                        <Link href="/">
                            <a className="nav-link">Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/playground">
                            <a className="nav-link">Playground</a>
                        </Link>
                    </li> */}
                </ul>
            </div>
            <h1>Mint your unique username in the whole universe 🌎</h1>
            <h2 style={{color: 'beige'}}>Please style this funckin.. app, Pal!</h2>
        </div>
        <main>{children}</main>
    </div>
);

export default Layout;

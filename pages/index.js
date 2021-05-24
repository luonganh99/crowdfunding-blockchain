import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import web3 from '../web3';

export default function Home() {
    // useEffect(() => {
    //     async function getData() {
    //         const netId = await web3.eth.net.getId();
    //         await window.ethereum.enable();
    //         const accounts = await web3.eth.getAccounts();
    //         // const balance = await web3.eth.getBalance(accounts[0]);

    //         console.log(netId);
    //         console.log(accounts);
    //         // console.log(balance);
    //     }

    //     getData();
    // }, []);

    return <div className={styles.container}></div>;
}

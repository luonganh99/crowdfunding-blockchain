import { useEffect } from 'react';
import CardSlider from '../components/CardSlider';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import web3 from '../web3';
import campaignFactory from '../web3/campaignFactory';

export default function Home() {
    useEffect(() => {
        async function getData() {
            const netId = await web3.eth.net.getId();
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(accounts[0]);

            console.log(netId);
            console.log(accounts);
            console.log(balance);

            const cp = await campaignFactory('0xb0876683588bf331AeAdBac5F4bC995837c86146')
                .methods.getCampaigns()
                .call();
            console.log(cp);
        }

        getData();
    }, []);

    return (
        <Layout>
            <Hero />
            <CardSlider />
        </Layout>
    );
}

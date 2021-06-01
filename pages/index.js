import { useEffect } from 'react';
import CardSlider from '../components/CardSlider';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import web3 from '../web3';
import campaignFactory from '../web3/campaignFactory';
import campaign from '../web3/campaign';

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

            // Address of contract
            const campaignAddress = await campaignFactory('0xb0876683588bf331AeAdBac5F4bC995837c86146')
                .methods.getCampaigns()
                .call();
            console.log(campaignAddress);
            // const cp = await campaign(campaignAddress[0]).methods.getSummary().call();
            const cp = await campaignAddress.map(async (add) => await campaign(add).methods.getSumary().call());
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

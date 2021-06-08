import { useEffect, useState } from 'react';
import CardSlider from '../components/CardSlider';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import web3 from '../web3';
import campaignFactory from '../web3/campaignFactory';
import campaign from '../web3/campaign';
import toCampaign from '../utils/toCampaign';

export default function Home() {
    const [campaigns, setCampaigns] = useState([]);

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
            const campaignAddresses = await campaignFactory('0x1f1152cA2cFCCBD96E396a12D336A1637cEe76F2')
                .methods.getCampaigns()
                .call();
            console.log(campaignAddresses);
            // let campaigns = [];
            // campaignAddresses.forEach(async (add) => {
            //     const camp = await campaign(add).methods.getSummary().call();
            //     console.log(typeof camp);
            //     campaigns.push(camp);
            //     console.log(campaigns);
            // });

            const updatedCampaigns = await Promise.all(
                campaignAddresses.map(async (add) => {
                    const camp = await campaign(add).methods.getSummary().call();
                    return toCampaign(camp);
                })
            );

            setCampaigns(updatedCampaigns);
        }

        getData();
    }, []);

    return (
        <Layout>
            <Hero />
            <CardSlider campaigns={campaigns} />
        </Layout>
    );
}

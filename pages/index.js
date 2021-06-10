import { useEffect, useState } from 'react';
import CardSlider from '../components/CardSlider';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import web3 from '../web3';
import campaignFactoryWeb3 from '../web3/campaignFactoryWeb3';
import campaignWeb3 from '../web3/campaignWeb3';
import toCampaign from '../utils/toCampaign';

export default function Home() {
    const [campaigns, setCampaigns] = useState([]);
    console.log('OUTPUT ~ file: index.js ~ line 12 ~ Home ~ campaigns', campaigns);

    useEffect(() => {
        async function getData() {
            const netId = await web3.eth.net.getId();
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(accounts[0]);

            console.log(netId);
            console.log(accounts);
            console.log(balance);
            // List of campainAdress
            const campaignAddresses = await campaignFactoryWeb3('0x0617E2a324c04046491Ec44d79582d145263c655')
                .methods.getCampaigns()
                .call();
            console.log(campaignAddresses);

            const updatedCampaigns = await Promise.all(
                campaignAddresses.map(async (add) => {
                    const campaign = await campaignWeb3(add).methods.getSummary().call();
                    return toCampaign(campaign, add);
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

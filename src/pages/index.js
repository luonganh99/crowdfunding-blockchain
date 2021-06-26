import { useEffect, useState } from 'react';
import CardSlider from '../components/CardSlider';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import toCampaign from '../utils/toCampaign';
import web3 from '../web3';
import campaignFactoryWeb3 from '../web3/campaignFactoryWeb3';
import campaignWeb3 from '../web3/campaignWeb3';

export default function Home() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        async function getData() {
            const campaignAddresses = await campaignFactoryWeb3().methods.getCampaigns().call();
            const updatedCampaigns = await Promise.all(
                campaignAddresses.map(async (add) => {
                    const campaign = await campaignWeb3(add).methods.getSummary().call();
                    return toCampaign(campaign, add);
                })
            );

            setCampaigns(updatedCampaigns);
        }

        if (!web3) {
            return;
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

import web3 from './index';
import CampaignFactory from '../build/contracts/CampaignFactory.json';

export default function campaignFactoryWeb3(address) {
    return new web3.eth.Contract(CampaignFactory.abi, address);
}

import web3 from './index';
import CampaignFactory from '../../build/contracts/CampaignFactory.json';

export default function campaignFactoryWeb3() {
    return new web3.eth.Contract(CampaignFactory.abi, '0xf684C3527137921132ba4A9B3E1Cee0a3d42A6F6');
}

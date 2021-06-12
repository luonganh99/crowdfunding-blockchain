import web3 from './index';
import CampaignFactory from '../build/contracts/CampaignFactory.json';

export default function campaignFactoryWeb3() {
    return new web3.eth.Contract(CampaignFactory.abi, '0x787105b0c00bE9f8A082eb954773068Fe0b82bd5');
}

import web3 from './index';
import CampaignFactory from '../build/contracts/CampaignFactory.json';

export default (address) => {
    return new web3.eth.Contract(CampaignFactory.abi, address);
};

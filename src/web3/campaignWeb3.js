import web3 from './index';
import Campaign from '../../build/contracts/Campaign.json';

export default function campaignWeb3(address) {
    return new web3.eth.Contract(Campaign.abi, address);
}

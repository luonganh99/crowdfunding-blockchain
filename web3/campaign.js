import web3 from './index';
import Campaign from '../build/contracts/Campaign.json';

export default (address) => {
    return new web3.eth.Contract(JSON.parse(Campaign.abi), address);
};

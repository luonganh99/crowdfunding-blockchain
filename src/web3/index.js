import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined') {
    if (typeof window.web3 !== 'undefined') {
        // we are in the browser and meta mask is installed
        web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert('Please install meta mask extension first to fully access to this page. Visit guide section for more detail');
    }
}

// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {

// } else {
//     // we are on the server *OR* meta mask is not running
//     // creating our own provider
//     // const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/01183f6b6e8d4aaf8aa97136aded1264');
//     // web3 = new Web3(provider);
// }

export default web3;

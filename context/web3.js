import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';

const Web3Context = createContext();

export function Web3Provider({ children }) {
    const [web3, setWeb3] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
            // we are in the browser and meta mask is installed
            setWeb3(new Web3(window.web3.currentProvider));
        } else {
            // we are on the server *OR* meta mask is not running
            // creating our own provider
            // const provider = new Web3.providers.HttpProvider(
            //     'https://rinkeby.infura.io/v3/01183f6b6e8d4aaf8aa97136aded1264'
            // );

            // setWeb3(new Web3(provider));
            window.alert('Please install meta mask first');
        }
    }, []);

    return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
}

export function useWeb3Context() {
    return useContext(Web3Context);
}

import { createContext, useEffect, useState } from 'react';
import web3 from '../web3';

export const AccountsContext = createContext([]);

export default function AccountsProvider({ children }) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const getAccounts = async () => {
            await window.ethereum.enable();
            const updatedAccounts = await web3.eth.getAccounts();
            setAccounts(updatedAccounts);
        };

        if (!web3) {
            return;
        }

        getAccounts();
    }, []);

    return <AccountsContext.Provider value={accounts}>{children}</AccountsContext.Provider>;
}

import { ChakraProvider } from '@chakra-ui/react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/date-picker.css';
import AccountsProvider from '../context/AccountsContext';

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <AccountsProvider>
                <Component {...pageProps} />
            </AccountsProvider>
        </ChakraProvider>
    );
}

export default MyApp;

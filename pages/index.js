import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CardSlider from '../components/CardSlider';
import Layout from '../components/Layout';

export default function Home() {
    // useEffect(() => {
    //     async function getData() {
    //         const netId = await web3.eth.net.getId();
    //         await window.ethereum.enable();
    //         const accounts = await web3.eth.getAccounts();
    //         // const balance = await web3.eth.getBalance(accounts[0]);

    //         console.log(netId);
    //         console.log(accounts);
    //         // console.log(balance);
    //     }

    //     getData();
    // }, []);

    return (
        <Layout>
            <Hero />
            <CardSlider />
        </Layout>
    );
}

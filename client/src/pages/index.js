import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import DefaultBody from "../../components/DefaultBody";
import ConnectedBody from "../../components/ConnectedBody";
import { useMoralis } from "react-moralis";
import ConnectToChain from "../../components/ConnectToChain";
import { Backdrop } from "@mui/material";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
    const { account, isWeb3Enabled, chainId: chainHex } = useMoralis();
    const [ isLoading, setLoading ] = useState(false);

    return (
        <div className="d-flex flex-column justify-content-between vh-100">
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <NavBar />
            {isWeb3Enabled ? (
                chainHex == "0xaa36a7" ? (
                    <ConnectedBody setLoading = {setLoading}/>
                ) : (
                    <ConnectToChain />
                )
            ) : (
                <DefaultBody />
            )}
            <Footer />
        </div>
    );
}

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import DefaultBody from "../../components/DefaultBody";
import ConnectedBody from "../../components/ConnectedBody";
import { useMoralis } from "react-moralis";
import ConnectToChain from "../../components/ConnectToChain";

export default function Home() {
  const { account, isWeb3Enabled, chainId: chainHex} = useMoralis();
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <NavBar />
      {isWeb3Enabled  ?  (chainHex == "0xaa36a7")? <ConnectedBody /> : <ConnectToChain /> : <DefaultBody />}
      <Footer />
    </div>
  )
}

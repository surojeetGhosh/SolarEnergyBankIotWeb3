import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import DefaultBody from "../../components/DefaultBody";
import ConnectedBody from "../../components/ConnectedBody";
import { useMoralis } from "react-moralis";

export default function Home() {
  const { user, account} = useMoralis();
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <NavBar />
      {account  ? <ConnectedBody /> : <DefaultBody />}
      <Footer />
    </div>
  )
}

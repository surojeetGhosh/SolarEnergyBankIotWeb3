import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import DefaultBody from "../../components/DefaultBody";

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <NavBar />
      <DefaultBody />
      <Footer />
    </div>
  )
}

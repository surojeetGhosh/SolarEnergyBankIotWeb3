import { ConnectButton } from "@web3uikit/web3";
export default function NavBar() {
    return (
        <div className="navbar p-5">
            <a class="navbar-brand text-light" href="/">
                <img
                    src="./logo.png"
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt=""
                />
                <h1 className="d-inline-block px-2 brand">EzSolax</h1>
            </a>
            <ConnectButton />
        </div>
    );
}

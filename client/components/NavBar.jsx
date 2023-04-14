import { ConnectButton } from "@web3uikit/web3";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function NavBar() {
    const media = useMediaQuery("(max-width: 370px)");

    return (
        <div class="navbar navbar-expand-md navbar-light bg-transparent p-5 p-xs-2">
            <a class="navbar-brand text-dark" href="#">
                {media ? null : (
                    <img
                        src="./logo.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-center"
                        alt=""
                    />
                )}

                <h1 className="d-inline-block px-2 brand" style={{fontSize: media? "1rem": "2rem", fontWeight:"bold"}}>EzSolax</h1>
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <div className="navbar-nav p-3">
                    <ConnectButton className="m-auto" />
                </div>
            </div>
        </div>
    );
}

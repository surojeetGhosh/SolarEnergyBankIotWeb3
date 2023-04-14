import { ConnectButton } from "@web3uikit/web3";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function NavBar() {
    const media = useMediaQuery("(max-width: 370px)");

    return (
        <div className="navbar navbar-expand-md navbar-light bg-transparent p-5 p-xs-2">
            <a className="navbar-brand text-dark" href="#">
                {media ? null : (
                    <img
                        src="./logo.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-center"
                        alt=""
                    />
                )}

                <h1
                    className="d-inline-block px-2 letter-space"
                    style={{
                        fontSize: media ? "1rem" : "2rem",
                        fontWeight: "bold",
                    }}
                >
                    EzSolax
                </h1>
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <div className="navbar-nav p-3">
                    <ConnectButton className="m-auto" />
                </div>
            </div>
        </div>
    );
}

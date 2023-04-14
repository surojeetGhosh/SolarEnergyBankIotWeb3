import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Paper } from "@mui/material";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import { Button } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PowerIcon from "@mui/icons-material/Power";
import contract from "../constants/contract";
import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { useMoralis } from "react-moralis";

export default function ConnectedBody() {
    const media = useMediaQuery("(min-width: 650px)");
    const [balance, setBalance] = useState(0);
    const [errorTransaction, setErrorTransaction] = useState(null);
    const { isWeb3Enabled, account } = useMoralis();
    const { runContractFunction: getBalance } = useWeb3Contract({
        abi: contract.abi,
        contractAddress: contract.address,
        functionName: "getBalance",
    });

    useEffect(() => {
        if (isWeb3Enabled) {
            
            getBalance()
                .then((res) => {
                    setBalance(parseInt(res.toString()));
                    console.log(parseInt(res.toString()));
                })
                .catch((err) => {
                    setErrorTransaction(err);
                });
        }
    }, [account]);

    return (
        <div>
            <Container maxWidth="md">
                <Grid
                    container
                    sx={{ bgcolor: "rgba(0,0,0,0.3)", height: "50vh" }}
                    className="p-2 rounded shadow-lg d-flex align-items-center"
                >
                    <Grid item sm={6} xs={12} className="text-center">
                        <Button
                            variant="contained"
                            color="warning"
                            className="w-50 p-4 fw-bold"
                        >
                            <PowerIcon /> Start
                        </Button>
                    </Grid>
                    <Grid item sm={6} xs={12} className="text-center">
                        <Button
                            variant="contained"
                            color="warning"
                            className="w-50 p-4 fw-bold"
                        >
                            <AttachMoneyIcon /> Buy Energy
                        </Button>
                    </Grid>
                    <Grid item xs={12} container>
                        <Paper className="m-auto p-4 w-75 d-flex flex-column">
                            <Typography
                                variant="body1"
                                className="text-dark fw-bold"
                                sx={{ fontSize: media ? "1.5rem" : "1rem" }}
                            >
                                <SolarPowerIcon /> Balance
                            </Typography>
                            <Typography
                                variant="body1"
                                className="text-dark fw-bold text-center"
                                sx={{ fontSize: media ? "1.5rem" : "1rem" }}
                            >
                                {balance} units
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

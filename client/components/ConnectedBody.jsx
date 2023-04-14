import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Paper } from "@mui/material";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import contract from "../constants/contract";
import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { useMoralis } from "react-moralis";
import FundButton from "./FundButton";
import StartButton from "./StartButton";
import { useNotification } from "@web3uikit/core";

export default function ConnectedBody(props) {
    const media = useMediaQuery("(min-width: 650px)");
    const [balance, setBalance] = useState(0);
    const dispatch = useNotification();
    const [refreshBalance, setRefresh] = useState(false);
    // current user attributes
    const { isWeb3Enabled, account } = useMoralis();

    // contract functions
    const { runContractFunction: getBalance } = useWeb3Contract({
        abi: contract.abi,
        contractAddress: contract.address,
        functionName: "getBalance",
    });

    useEffect(() => {
        if (isWeb3Enabled) {
            async function getBalanceAccount() {
                const data = await getBalance({
                    onError: (error) => {
                        dispatch({
                            type: "ERROR",
                            message: "Contract Not Connected",
                            title: "Status Notification",
                            position: "topR",
                            icon: "bell"
                        });
                    }
                })
                if(data) {
                    setBalance((parseFloat(data.toString()) / 1e18));
                }
                
            }
            getBalanceAccount();
            setRefresh(false);
        }
    }, [account, refreshBalance]);

    return (
        <div>
            <Container maxWidth="md">
                <Grid
                    container
                    sx={{ bgcolor: "rgba(0,0,0,0.3)", height: "50vh" }}
                    className="p-2 rounded shadow-lg d-flex align-items-center"
                >
                    <Grid item sm={6} xs={12} className="text-center">
                        <StartButton />
                    </Grid>
                    <Grid item sm={6} xs={12} className="text-center">
                        <FundButton setLoading = {props.setLoading} setRefresh = {setRefresh }/>
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
                                {parseFloat(balance).toFixed(5).toString()} units
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

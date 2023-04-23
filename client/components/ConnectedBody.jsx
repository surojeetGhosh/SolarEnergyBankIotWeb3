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
import { Refresh } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function ConnectedBody(props) {
    const media = useMediaQuery("(min-width: 650px)");
    const [balance, setBalance] = useState(0);
    const dispatch = useNotification();
    const [machineCode, setMachineCode] = useState("");
    const [refreshBalance, setRefresh] = useState(false);
    const [machineState, setState] = useState(false);
    // current user attributes
    const { isWeb3Enabled, account } = useMoralis();

    // contract functions
    const { runContractFunction: getBalance } = useWeb3Contract({
        abi: contract.abi,
        contractAddress: contract.address,
        functionName: "getBalance",
        params: {
            user: account.toString(),
        }
    });
    const { runContractFunction: getUser } = useWeb3Contract({
        abi: contract.abi,
        contractAddress: contract.address,
        functionName: "currentUser",
        params: {
            _machineId: "1",
        },
    });

    async function refresh() {
        var data = await getBalance({
            onError: (error) => {
                dispatch({
                    type: "ERROR",
                    message: "Contract Not Connected",
                    title: "Status Notification",
                    position: "topR",
                    icon: "bell",
                });
            },
        });
        if (data) {
            data = parseFloat(data.toString()) / 1e18
            if(data === 0) {
                setState(false);
            }
            setBalance(data);
        }
    }

    useEffect(() => {
        if(isWeb3Enabled) {
            async function getCurrentUser() {
                const data = await getUser({
                    onError: (error) => {
                        dispatch({
                            type: "ERROR",
                            message: "Contract Not Connected",
                            title: "Status Notification",
                            position: "topR",
                            icon: "bell",
                        });
                    },
                });
                if (data) {
                    if (data.toString().toUpperCase() === account.toString().toUpperCase()) {   
                        setState(true);
                        setMachineCode("1");
                    }
                }
            }
            getCurrentUser();
        }
    }, []);

    useEffect(() => {
        if(isWeb3Enabled) {
            async function getBalanceAccount() {
                const data = await getBalance({
                    onError: (error) => {
                        dispatch({
                            type: "ERROR",
                            message: "Contract Not Connected",
                            title: "Status Notification",
                            position: "topR",
                            icon: "bell",
                        });
                    },
                });
                if (data) {
                    setBalance(parseFloat(data.toString()) / 1e18);
                }
            }
            const timer = setTimeout(getBalanceAccount, 10000);
            clearTimeout(timer);
        }
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
                            icon: "bell",
                        });
                    },
                });
                if (data) {
                    setBalance(parseFloat(data.toString()) / 1e18);
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
                        <StartButton
                            setLoading={props.setLoading}
                            setRefresh={setRefresh}
                            balance = {balance}
                            machineState = {machineState}
                            setState = {setState}
                            machineCode = {machineCode}
                            setMachineCode = {setMachineCode}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12} className="text-center">
                        <FundButton
                            setLoading={props.setLoading}
                            setRefresh={setRefresh}
                        />
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
                                {parseFloat(balance).toFixed(5).toString()}{" "}
                                units
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className="text-center">
                        <Button variant="contained" color="secondary"  onClick={refresh}>
                            <Refresh />
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

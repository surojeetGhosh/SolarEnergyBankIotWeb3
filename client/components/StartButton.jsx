import { Button, Box, Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PowerIcon from "@mui/icons-material/Power";
import Modal from "@mui/material/Modal";
import { Typography, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import contract from "../constants/contract";
import QrScanner from "qr-scanner";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function StartButton(props) {
    const dispatch = useNotification();
    const [machineCode, setMachineCode] = useState("");
    const ref = useRef();
    const [machineState, setState] = useState(false);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const { runContractFunction: start } = useWeb3Contract({
        abi: contract.abi,
        contractAddress: contract.address,
        functionName: "startMachine",
        params: {
            _machineId: machineCode,
        },
    });

    const { runContractFunction: stop } = useWeb3Contract({
        abi: contract.abi,
        contractAddress: contract.address,
        functionName: "stopMachine",
        params: {
            _machineId: machineCode,
        },
    });

    
    const handleOpen = () => {
        setMachineCode("");
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        ref.current.click();
    };

    const handleSubmit = () => {
        handleClose();
        startMachine();
    }

    const handleStop = () => {
        stopMachine();
    }

    async function startMachine() {
        props.setLoading(true);
        await start({
            onSuccess: handleStartSuccess,
            onError: (error) => {
                props.setLoading(false);
                console.log(error);
                dispatch({
                    type: "ERROR",
                    message: "Machine State is Ambiguous",
                    title: "Status Notification",
                    position: "topR",
                    icon: "bell",
                });
            },
        });
    }

    async function stopMachine() {
        props.setLoading(true);
        await stop({
            onSuccess: handleStopSuccess,
            onError: (error) => {
                props.setLoading(false);
                console.log(error);
                dispatch({
                    type: "ERROR",
                    message: "Machine State is Ambiguous",
                    title: "Status Notification",
                    position: "topR",
                    icon: "bell",
                });
            },
        });
    }

    async function handleStartSuccess(tx) {
        await tx.wait(1);
        props.setLoading(false);
        setState(true);
        dispatch({
            type: "info",
            message: "Machine Started",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    }

    async function handleStopSuccess(tx) {
        await tx.wait(1);
        props.setLoading(false);
        setState(false);
        dispatch({
            type: "info",
            message: "Machine Stopped",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    }
    return (
        <>
            {machineState ? (
                <Button
                    variant="contained"
                    color="warning"
                    className="w-50 p-4 fw-bold"
                    onClick={handleStop}
                >
                    <PowerIcon /> Stop
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="warning"
                    className="w-50 p-4 fw-bold"
                    onClick={handleOpen}
                    disabled={(props.balance === 0)? true: false}
                >
                    <PowerIcon /> Start
                </Button>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="d-flex flex-column">
                    {machineCode ? (
                        <>
                            <Typography className="m-auto">Machine Code: {machineCode}</Typography>
                            <Button
                                variant="contained"
                                color="warning"
                                className="w-25 m-auto mt-2"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </>
                    ) : (
                        <>
                            <input
                                type="file"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    QrScanner.scanImage(e.target.files[0])
                                        .then((result) => {
                                            if (
                                                JSON.parse(result).machineCode
                                            ) {
                                                setMachineCode(
                                                    JSON.parse(result)
                                                        .machineCode
                                                );
                                            } else {
                                                setImage("");
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }}
                                accept="image/png, image/jpeg"
                                className="d-none"
                                ref={ref}
                            ></input>
                            <Button
                                variant="contained"
                                color="warning"
                                className="w-25 m-auto mt-2"
                                onClick={handleClick}
                            >
                                Scan
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
}

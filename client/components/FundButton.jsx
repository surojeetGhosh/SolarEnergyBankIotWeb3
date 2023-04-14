import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "@mui/material";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import contract from "../constants/contract";
import { Modal } from "@mui/material";
import { TextField, Box } from "@mui/material";
import { useNotification } from "@web3uikit/core";

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

const etherToWei  = (ether) => {
    const etherFloat = parseFloat(ether);
    return parseInt(etherFloat * 1e18).toString();
}

export default function FundButton(props) {
    const [msgValue, setMessageValue] = useState("");
    const [error, OnError] = useState(true);
    const { runContractFunction: buyEnergy } = useWeb3Contract({
        abi: contract.abi,
        contractAddress: contract.address,
        functionName: "buy",
        msgValue: etherToWei(msgValue),
    });
    const dispatch = useNotification();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function pay() {
        handleClose();
        props.setLoading(true);
        await buyEnergy({
            onSuccess: handleSuccess,
            onError: (error) => {
                props.setRefresh(true);
                props.setLoading(false);
                console.log(error);
                dispatch({
                    type: "ERROR",
                    message: "Contract Not Connected",
                    title: "Status Notification",
                    position: "topR",
                    icon: "bell"
                });
            },
        });
    }

    async function handleSuccess(tx) {
        await tx.wait(1);
        props.setRefresh(true);
        props.setLoading(false);
        dispatch({
            type: "info",
            message: "Ethers Paid",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell"
        });
    }

    return (
        <>
            <Button
                variant="contained"
                color="warning"
                className="w-50 p-4 fw-bold"
                onClick={handleOpen}
            >
                <AttachMoneyIcon /> Buy Energy
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="d-flex flex-column">
                    <TextField
                        id="standard-basic"
                        label="Amount"
                        variant="standard"
                        value={msgValue}
                        onChange={(e) => {
                            setMessageValue(e.target.value);
                            const pattern = /[a-zA-Z]/;
                            if (pattern.test(e.target.value) || e.target.value == "" || e.target.value == "0") {
                                OnError(true);
                            } else {
                                OnError(false);
                            }
                        }}
                        error={error}
                    />
                    <Button variant="contained" color="warning" className="w-25 m-auto mt-2" disabled = {error} onClick={pay}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

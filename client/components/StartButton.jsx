import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "@mui/material";
import { useState } from "react";
import PowerIcon from "@mui/icons-material/Power";

export default function StartButton() {

    return (
        <Button
            variant="contained"
            color="warning"
            className="w-50 p-4 fw-bold"
        >
            <PowerIcon /> Start
        </Button>
    );
}

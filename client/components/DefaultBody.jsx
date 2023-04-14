import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DefaultBody() {
    const media = useMediaQuery('(min-width: 650px)');
    return (
        <div className="default-body">
            <Container maxWidth="md">
                <Box sx={{ bgcolor: "rgba(0,0,0,0.3)", height: "50vh" }} className="m-3 rounded shadow-lg d-flex align-items-center"> 
                    <Typography variant={media? "h3": "h5"} className="text-light fw-bold m-auto text-center"><WalletIcon sx={{fontSize: media? "3.7rem": "2.7rem"}}/> Connect to Wallet</Typography>
                </Box>
            </Container>
        </div>
    );
}

import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ConnectToChain() {
    const media = useMediaQuery('(min-width: 650px)');
    return (
        <div className="default-body">
            <Container maxWidth="md">
                <Box sx={{ bgcolor: "rgba(0,0,0,0.3)", height: "50vh" }} className="m-3 rounded shadow-lg d-flex align-items-center"> 
                    <Typography variant={media? "h3": "h5"} className="text-light fw-bold m-auto text-center"><LinkIcon sx={{fontSize: media? "3.7rem": "2.7rem"}}/> Connect to Sepolia Network</Typography>
                </Box>
            </Container>
        </div>
    );
}

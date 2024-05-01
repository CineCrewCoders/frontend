import { LiveTv } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ILogoProps {
}
export const Logo: FunctionComponent<ILogoProps> = () => {
    return (
        <Link to="/">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <LiveTv fontSize="large" sx={{ paddingRight: '4px' }} />
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        mr: 2,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                        paddingTop: "8px",
                    }}
                >
                    IMDev
                </Typography>
            </div>
        </Link>
    )
}

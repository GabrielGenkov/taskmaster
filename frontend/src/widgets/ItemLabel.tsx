import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../utils/redux/store";
import { secondary } from "../utils/theme/theme";

type Props = {label: string};

function ItemLabel({label}: Props) {
    const colorMode = useAppSelector((state) => state.users.colorMode);

    return (
        <Typography
            key={label}
            variant="caption"
            display="block"
            sx={(theme) => ({
                backgroundColor:
                    colorMode == "dark"
                        ? theme.palette.secondary.main
                        : secondary.secondary700,
                padding: "5px 10px",
                borderRadius: "10px",
                color: "#fff",
            })}
        >
            {label}
        </Typography>
    );
}

export default ItemLabel;

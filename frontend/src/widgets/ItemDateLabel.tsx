import { Typography } from "@mui/material";
import React from "react";
import { primary } from "../utils/theme/theme";

type Props = {
    dueDate: string;
}

function ItemDateLabel(props: Props) {
    function formatDate(date: Date) {
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
        });
    }

    const isDateLate = () => {
        const currentDate = new Date();
        const due = new Date(props.dueDate);

        return currentDate > due;
    };

    return (
        <Typography
            variant="caption"
            display="block"
            sx={(theme) => ({
                backgroundColor: isDateLate()
                    ? theme.palette.error.light
                    : primary.primary700,
                padding: "5px 10px",
                borderRadius: "10px",
                color: isDateLate() ? "red" : "#fff",
            })}
        >
            {formatDate(new Date(props.dueDate))}
        </Typography>
    );
}

export default ItemDateLabel;

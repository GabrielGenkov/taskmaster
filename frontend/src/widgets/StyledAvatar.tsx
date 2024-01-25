import { Avatar } from "@mui/material";
import React from "react";

type Props = {
    name: string;
    width?: string;
    height?: string;
    colorful?: boolean;
};

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function getAvatarInitials(name: string) {
    const splitName = name.split(" ");
    if (splitName.length == 1) {
        return splitName[0].charAt(0);
    } else {
        return (
            splitName[0].charAt(0) + splitName[splitName.length - 1].charAt(0)
        );
    }
}

function StyledAvatar(props: Props) {
    return (
        <Avatar
            key={props.name}
            alt={props.name}
            sx={(theme) => ({
                bgcolor: props.colorful
                    ? stringToColor(props.name)
                    : theme.palette.secondary.main, // sets the background color to transparent
                color: props.colorful ? "white" : theme.palette.primary.main,
                "&.MuiAvatar-colorDefault": props.colorful ? {} : {
                    color: "white",
                    border: "1px solid white",
                },
                width: props.width ? props.width : "36px",
                height: props.height ? props.height : "36px",
            })}
        >{getAvatarInitials(props.name)}</Avatar>
    );
}

export default StyledAvatar;

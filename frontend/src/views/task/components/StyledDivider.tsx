import { Divider, styled } from "@mui/material";
import { secondary } from "../../../utils/theme/theme";
import { useAppSelector } from "../../../utils/redux/store";
import React from "react";

type Props = {};

function StyledDivider({}: Props) {
    const mode = useAppSelector((state) => state.users.colorMode);
    const StyledDivider = styled(Divider)(() => ({
        borderColor: mode === "dark" ? secondary.secondary600 : "#76767680",
        marginBlock: 8,
    }));

    return <StyledDivider />
}


export default StyledDivider;

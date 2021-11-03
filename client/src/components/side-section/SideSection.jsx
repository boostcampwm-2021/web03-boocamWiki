import React from "react";
import styled from "styled-components";
import SectionItem from "./side-section-components/SectionItem";

const SideArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const SideSection = () => {
    return(
        <SideArea>
            <SectionItem />
            <SectionItem />
        </SideArea>
    )
}

export default SideSection;
import React from "react";
import styled from "styled-components";
import MainPage from "./mainpage/mainSection";
import RecentSection from "./sidepage/recentSection";
import RankSection from "./sidepage/rankSection";

const SectionArea = styled.div`
    background: #D7D7D7;
    width: 100%;
    height: 1500px;
    display: flex;
    justify-content: center;
`;

const SideArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
`;

const Section = () => {
    return(
        <SectionArea>
            <MainPage />
            <SideArea>
                <RecentSection />
                <RankSection />
            </SideArea>
        </SectionArea>
    )
}

export default Section;
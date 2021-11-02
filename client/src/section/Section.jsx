import React from "react";
import styled from "styled-components";
import MainPage from "./mainpage/mainSection";
import RecentSection from "./sidepage/recentSection";
import RankSection from "./sidepage/rankSection";

const SectionArea = styled.div`
    background: #F6F6F6;
    width: 1920px;
    height: 1500px;
    display: flex;
`;

const SideArea = styled.div`
    display: flex;
    flex-direction: column;
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
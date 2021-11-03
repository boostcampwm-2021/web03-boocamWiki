import React from "react";
import styled from "styled-components";
import MainPage from "./mainpage/mainSection";
import RecentSection from "./sidepage/recentSection";
import RankSection from "./sidepage/rankSection";

const SectionBackground = styled.div`
    background: #F6F6F6;
    width: 100%;
    min-width: 1920px;
    height: 1500px;
`;

const SectionArea = styled.div`
    display: flex;
    justify-content: center;
`;

const SideArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Section = () => {
    return(
        <SectionBackground>
            <SectionArea>
                <MainPage />
                <SideArea>
                    <RecentSection />
                    <RankSection />
                </SideArea>
            </SectionArea>
        </SectionBackground>
    )
}

export default Section;
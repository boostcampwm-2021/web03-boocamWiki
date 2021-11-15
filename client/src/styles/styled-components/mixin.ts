import styled, { css } from "styled-components";

interface Font {
  color: string;
  family: string;
  size: string;
  weight: string;
}

interface FlexBox {
  direction: string;
  justifyContent: string;
  alignItems: string;
}

export const font = ({ color, family, size, weight }:Font) => `
  color: ${color || "#222222"};
  font-family: ${family || "Noto Sans KR"};  
  font-size: ${size || "16px"};
  font-weight: ${weight || "500"};
`;

export const flexBox = ({direction, justifyContent, alignItems}: FlexBox) => `
  display: flex;
  flex-direction: ${direction || "row"};
  justify-content: ${justifyContent || "flex-start"};
  align-items: ${alignItems || "start"};
`;

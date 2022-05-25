import styled from "styled-components";
import { FlexBlock } from "../Container";

export const BannersContainer = styled(FlexBlock)`
  height: calc(100vh - 52px);
`;
export const BannersBlock = styled(FlexBlock)`
  gap: 20px;
  width: 50vw;
`;
export const BannerBase = styled(FlexBlock)`
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 16px;
  padding: 20px 50px;
  min-height: 30vh;
  font-size: 2rem;
  color: white;
  font-weight: 700;
`;
export const AlarmBanner = styled(BannerBase)`
  font-size: 5rem;
  background-color: red;
`;
export const AnswerBanner = styled(BannerBase)`
  background-color: green;
  
  .answer {
    font-size: 5rem;
    margin-left: 20px;
  }
`;


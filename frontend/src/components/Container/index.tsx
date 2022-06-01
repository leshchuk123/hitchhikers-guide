import styled from "styled-components";
import { breakpoints } from "../../constants/breakpoints";
import { IContainer } from "../../interfaces";

const Container = styled.div<IContainer>`
  padding: 0 20px;

  display: ${props => props.flex ? "flex" : "block"};
  flex-direction: ${props => props.direction || "unset"};
  align-items: ${props => props.align || "unset"};
  justify-content: ${props => props.justify || "unset"};

  @media screen and (min-width: ${breakpoints.lg}) {
    max-width: ${ breakpoints.lg };
    margin: 0 auto;
  }
`;

export default Container;

export const PageContainer = styled(Container)`
  min-height: 100vh;
  padding-top: 52px;
  padding-bottom: 100px;
`;

export const FlexBlock = styled.div<Omit<IContainer, "flex">>`
  display: flex;
  flex-direction: ${props => props.direction || "unset"};
  align-items: ${props => props.align || "unset"};
  justify-content: ${props => props.justify || "unset"};
`;

export const ButtonsContainer = styled(FlexBlock)`
  gap: 10px;
  padding: 20px 0;
`;

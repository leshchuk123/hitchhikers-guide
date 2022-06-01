import styled from "styled-components";
import { IContainer } from "../../interfaces";

export const FlexBlock = styled.div<Omit<IContainer, "flex">>`
  display: flex;
  flex-direction: ${props => props.direction || "unset"};
  align-items: ${props => props.align || "unset"};
  justify-content: ${props => props.justify || "unset"};
`;

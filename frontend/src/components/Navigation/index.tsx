import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledNavMenu = styled.nav`
  &.header {
    display: flex;
    gap: 10px;
  }
`;

export const StyledNavLink = styled(NavLink)`
  ${StyledNavMenu}.header & {
    color: whitesmoke;
    text-decoration: none;
    padding: 10px;

    &.active {
      color: #888888;
      cursor: default;
    }

    &:hover:not(.active) {
      background-color: #555555;
    }
  }
`;

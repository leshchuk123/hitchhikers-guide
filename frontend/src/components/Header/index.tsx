import * as React from 'react';
import Container from '../Container';
import { StyledNavLink, StyledNavMenu } from '../Navigation';

import { StyledHeader } from './StyledHeader';
import { StyledTitle } from './StyledTitle';

const Header = () => {
  return (
    <StyledHeader>
      <Container flex align='center' justify='space-between'>
        <StyledTitle>
          The Hitchhiker's Guide to the <del>Galaxy</del> Frontend
        </StyledTitle>
        <StyledNavMenu className="header">
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/articles">Articles</StyledNavLink>
        </StyledNavMenu>
      </Container>
    </StyledHeader>
  );
};

export default Header;

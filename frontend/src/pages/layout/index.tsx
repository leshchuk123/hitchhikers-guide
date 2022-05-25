import React, { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import { PageContainer } from '../../components/Container';
import Header from '../../components/Header';

const PageLayout: FC<PropsWithChildren<object>> = (props): JSX.Element => {
  return (
    <>
      <Header />

      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};

export default PageLayout;

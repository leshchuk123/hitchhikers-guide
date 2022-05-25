import * as React from 'react';
import { AlarmBanner, AnswerBanner, BannersBlock, BannersContainer } from '../../components/Banner/home';

import styles from './home.module.scss';

const HomePage = () => {
  return (
    <BannersContainer align="center" justify="center" >
      <BannersBlock direction='column'>
        <AlarmBanner>DON'T PANIC</AlarmBanner>
        <AnswerBanner>
          The Answer to the Ultimate Question of Life, the Universe, and Everything is
          <br />
          <span className="answer">42!</span>
        </AnswerBanner>
      </BannersBlock>
    </BannersContainer>
  );
};

export default HomePage;

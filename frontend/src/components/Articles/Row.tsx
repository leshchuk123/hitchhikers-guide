import React, { MouseEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { IArticle } from '../../interfaces/data';
import Icon from '../Icon';

export const ArticleRow = ({ data }: { data: IArticle }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const clickHandler: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    navigate(`/articles/${data.id}`);
  }, []);

  const dblClickHandler: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setExpanded(!expanded);
    },
    [expanded],
  );

  return (
    <StyledArticleRowContainer onClick={clickHandler}>
      <div className={`toggler ${expanded ? 'expanded' : ''}`} onClick={dblClickHandler}>
        <Icon name="rightArrow" size={16} color="grey" />
      </div>
      <div className="title">{data.title}</div>
      <div className="lastmod">
        {new Intl.DateTimeFormat('ru-RU', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(new Date(data.dateModified))}
      </div>
      <div className={`description ${expanded ? 'expanded' : ''}`}>{data.description}</div>
    </StyledArticleRowContainer>
  );
};

export const StyledArticleRowContainer = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 200px;
  margin-bottom: 16px;
  cursor: pointer;

  & > * {
    padding: 8px;
    display: flex;
    align-items: flex-start;
  }

  .toggler {
    grid-column: 1;
    grid-row: 1;
    justify-content: center;
    padding-top: 12px;

    &.expanded svg {
      transform: rotate(90deg);
    }
  }

  .title {
    grid-column: 2;
    grid-row: 1;
    font-weight: 700;
    justify-content: start;
  }

  .lastmod {
    grid-column: 3;
    grid-row: 1;
    color: grey;
    justify-content: end;
  }

  .description {
    grid-column: 2 / span 2;
    grid-row: 2;
    justify-content: start;
    background-color: #ddd;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .description:not(.expanded) {
    display: none;
  }
`;

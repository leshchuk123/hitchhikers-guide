import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { useParamsInt } from '../../hooks/router-enhance';
import { IArticle } from '../../interfaces/data';
import { fetchArticle } from '../../utils/data';

const Article = () => {
  const id = useParamsInt();
  const [article, setArticle] = useState<IArticle>();

  useEffect(() => {
    if (id !== null) {
      fetchArticle(id, (data) => {
        setArticle(data);
      });
    }
  }, [id]);

  return (
    <>
      <h1>{article?.title}</h1>
      <StyledArticle>
        <ReactMarkdown>{article?.body}</ReactMarkdown>
      </StyledArticle>
    </>
  );
};

export default Article;

const StyledArticle = styled.article`
  padding: 20px 50px;
  background-color: #eee;
`;

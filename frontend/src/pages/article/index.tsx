import * as React from 'react';
import { useParams } from 'react-router';

const Article = () => {
  const { id } = useParams();

  return <>
    <h1>Article {id}</h1>
  </>
}

export default Article;
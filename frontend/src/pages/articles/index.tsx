import React, { useEffect, useState } from 'react';
import { ArticlesList } from '../../components/Articles/List';
import { IArticle } from '../../interfaces/data';

const ArticlesPage = () => {
  const [data, setData] = useState<IArticle[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3001/api/articles');
      const json: { items: IArticle[] } = await response.json();
      const { items } = json;
      setData(items);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>ArticlesPage</h1>
      <ArticlesList data={data} />
    </>
  );
};

export default ArticlesPage;

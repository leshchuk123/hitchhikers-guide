import React, { useEffect, useState } from 'react';
import { IArticle } from '../../interfaces/data';

import styles from './articles.module.scss';

const ArticlesPage = () => {
  const [data, setData] = useState<IArticle[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3001/articles');
      const json: { items: IArticle[] } = await response.json();
      const { items } = json;
      console.log({ items });
      setData(items);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>ArticlesPage</h1>
      {data.map((item) => (
        <div key={`article/${item.id}`} className={styles.row}>
          <div className={styles.article_title}>{item.title}</div>
          <div className={styles.article_desc}>{item.description}</div>
        </div>
      ))}
    </>
  );
};

export default ArticlesPage;

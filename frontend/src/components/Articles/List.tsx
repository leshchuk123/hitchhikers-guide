import React from 'react';
import { IArticle } from '../../interfaces/data';
import { ArticleRow } from './Row';

export const ArticlesList = ({ data = [] }: { data: IArticle[] }) => {
  return (
    <>
      {data.map((entry) => (
        <ArticleRow key={entry.id} data={entry} />
      ))}
    </>
  );
};

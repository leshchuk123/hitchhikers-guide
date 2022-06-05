import { IArticle } from '../interfaces/data';

export interface IFetchArticle {
  (id: number, onsuccess?: (data: IArticle) => void, onfail?: (error: Error) => void): void;
}
export const fetchArticle: IFetchArticle = async (id, onsuccess, onfail) => {
  try {
    const response = await fetch(`http://localhost:3001/api/articles/${id}`);
    const json: { data: IArticle } = await response.json();
    const { data } = json;
    onsuccess && onsuccess(data);
  } catch (err) {
    onfail && onfail(err);
  }
};

// useParamsInt.ts
import { useParams } from 'react-router-dom';

export const useParamsInt = (key = 'id') => {
  const params = useParams();
  return params[key] ? parseInt(params[key]) : null;
};

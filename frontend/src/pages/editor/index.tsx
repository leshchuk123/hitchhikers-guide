import * as React from 'react';
import { useParams } from 'react-router';

const Editor = () => {
  const { id } = useParams();
  console.log({id})

  return <>
    <h1>{id !== undefined ? `Edit article ${id}` : 'New article'}</h1>
  </>
};

export default Editor;
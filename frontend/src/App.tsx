import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Articles from './pages/articles';

import PageLayout from './pages/layout';
import Editor from './pages/editor';
import Article from './pages/article';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="articles">
          <Route index element={<Articles />} />
          <Route path='new' element={<Editor />} />
          <Route path=':id/edit' element={<Editor />} />
          <Route path=':id' element={<Article />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;

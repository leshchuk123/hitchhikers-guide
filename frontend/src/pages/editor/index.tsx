import React, {  useState,  useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor, { MarkdownEditorRef } from '@uiw/react-markdown-editor';
import {Button} from '../../components/Button';

import { IArticle } from '../../interfaces/data';

import styles from "./editor.module.scss";
import { Input, InputLabel } from '../../components/Input';

const Editor = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<IArticle>();
  const [markdown, setMarkdown] = useState("");
  const [dirty, setDirty] = useState(false);
  const [dirtyMD, setDirtyMD] = useState(false);
  const navigate = useNavigate();

  const editor = useRef<MarkdownEditorRef>();
  
  useEffect(() => {
    async function fetchArticle() {
      const response = await fetch(`http://localhost:3001/api/articles/${id}`);
      const json: { data: IArticle } = await response.json();
      const { data } = json;
      setArticle(data);
    }
    if (id) {
      fetchArticle();
    }
  }, [id]);

  useEffect(() => {
    setDirty(dirtyMD);
  }, [dirtyMD]);

  useEffect(() => {
    setDirtyMD(markdown !== article?.body);
  }, [markdown]);
  
  const doSave = () => {
    const ed = editor.current.editor;
  }

  const doReset = () => {
    const ed = editor.current.editor
    ed.setValue(article?.body || "");
  };

  const onChange = (editor, data, value) => {
    setMarkdown(value);
  }

  return <>
    <h1>{id !== undefined ? `Edit: ${article?.title || ""} [ID: ${id}]` : 'New article'}</h1>
    <div>
      <InputLabel htmlFor='title'>Title</InputLabel>
      <Input
        name='title'
        defaultValue={article?.title || ""}
        onKeyDown={(e) => { console.log({ e }) }}
      />
      {/* <input name='title' value={article?.title || ""} onKeyDown={(e) => { console.log({ e }) }} /> */}
    </div>
    <MarkdownEditor
      ref={editor}
      value={article?.body || ""}
      visible
      height={"70vh"}
      onChange={onChange}
    />
    <div className={styles.controls}>
      <Button onClick={doSave} disabled={!dirty}>Save</Button>
      <Button onClick={doReset} disabled={!dirty}>Reset</Button>
      <Button onClick={() => navigate(-1)}>Cancel</Button>
    </div>
  </>
};

export default Editor;
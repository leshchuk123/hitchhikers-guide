import React, {  useState,  useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor, { MarkdownEditorRef } from '@uiw/react-markdown-editor';
import {Button} from '../../components/Button';

import { IArticle } from '../../interfaces/data';

import { StyledLabeledInput } from '../../components/form/Input';
import { StyledFormContainer } from '../../components/form/Form';
import { ButtonsContainer } from '../../components/Container';
import { ChangeEventHandler } from 'react';

const Editor = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<IArticle>();
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dirty, setDirty] = useState(false);
  const navigate = useNavigate();

  const editor = useRef<MarkdownEditorRef>();
  const titleField = useRef<HTMLInputElement>();
  const descField = useRef<HTMLTextAreaElement>();
  
  useEffect(() => {
    async function fetchArticle() {
      const response = await fetch(`http://localhost:3001/api/articles/${id}`);
      const json: { data: IArticle } = await response.json();
      const { data } = json;
      setArticle(data);
      setTitle(data.title || "");
      setDescription(data.description || "");
    }
    if (id) {
      fetchArticle();
    }
  }, [id]);

  useEffect(() => {
    if (article === undefined) {
      setDirty(!!(markdown || title || description));
    } else {
      setDirty(
        markdown !== article?.body ||
        title !== article?.title ||
        description !== article?.description
      );
    }
  }, [markdown, title, description]);

  const doSave = () => {
    const ed = editor.current.editor;
  }

  const doReset = () => {
    const ed = editor.current.editor
    ed.setValue(article?.body || "");
    const { title = "", description = "" } = article || {};
    setTitle(titleField.current.value = title);
    setDescription(descField.current.value = description);
  };

  const onMDChange = (editor, data, value) => {
    setMarkdown(value);
  }

  const onChange: ChangeEventHandler = (e) => {
    console.log((e.target as HTMLInputElement).name)
    const target = e.target as HTMLInputElement;
    switch (target.name) {
      case "title":
        setTitle(target.value);
        break;
      case "description":
        setDescription(target.value);
        break;
    }
  }

  return <>
    <h1>{id !== undefined ? `Edit [ID: ${id}]: ${article?.title || ""}` : 'New article'}</h1>

    <StyledFormContainer>
      <StyledLabeledInput
        ref={titleField}
        label='Title'
        name='title'
        defaultValue={article?.title || ""}
        onChange={onChange}
        placeholder='Enter article title'
      />
      <StyledLabeledInput
        ref={descField}
        textarea
        label='Description'
        name='description'
        defaultValue={article?.description || ""}
        onChange={onChange}
        placeholder='Article description (optional)'
      />
    </StyledFormContainer>
    
    <MarkdownEditor
      ref={editor}
      value={article?.body || ""}
      visible
      height={"50vh"}
      onChange={onMDChange}
    />
    <ButtonsContainer align='center' justify='center'>
      <Button onClick={doSave} disabled={!dirty}>Save</Button>
      <Button onClick={doReset} disabled={!dirty}>Reset</Button>
      <Button onClick={() => navigate(-1)}>Cancel</Button>
    </ButtonsContainer>
  </>
};

export default Editor;
import MarkdownEditor, { MarkdownEditorRef } from '@uiw/react-markdown-editor';
import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { ButtonsContainer } from '../../components/Container';
import { StyledFormContainer } from '../../components/form/Form';
import { StyledLabeledInput } from '../../components/form/Input';
import { useParamsInt } from '../../hooks/router-enhance';
import { IArticle } from '../../interfaces/data';
import { fetchArticle } from '../../utils/data';

const Editor = () => {
  const id = useParamsInt();
  const [article, setArticle] = useState<IArticle>();
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dirty, setDirty] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const editor = useRef<MarkdownEditorRef>();
  const titleField = useRef<HTMLInputElement>();
  const descField = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (id !== null) {
      fetchArticle(id, (data) => {
        setArticle(data);
        setTitle(data.title || '');
        setDescription(data.description || '');
      });
    }
  }, [id]);

  useEffect(() => {
    const ml = markdown.trim().length;
    const tl = title.trim().length;
    const dl = description.trim().length;

    setValid(ml > 0 && tl > 0);

    if (article === undefined) {
      setDirty(ml > 0 || tl > 0 || dl > 0);
    } else {
      setDirty(
        markdown !== article?.body ||
          title !== article?.title ||
          description !== article?.description,
      );
    }
  }, [markdown, title, description]);

  const doSave = useCallback(() => {
    const data: IArticle = {
      title: titleField.current.value,
      description: descField.current.value,
      body: editor.current.editor.getValue(),
      id,
    };
    const asyncSave = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/articles', {
          method: !id ? 'POST' : 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
        });
        const result = await response.json();
        console.log({ result });
        navigate(`/articles/${result.id}`, { replace: true });
      } catch (err) {
        console.error(err);
      }
    };

    asyncSave();
  }, []);

  const doReset = useCallback(() => {
    const ed = editor.current.editor;
    ed.setValue(article?.body || '');
    const { title = '', description = '' } = article || {};
    setTitle((titleField.current.value = title));
    setDescription((descField.current.value = description));
  }, []);

  const onMDChange = (editor, data, value) => {
    setMarkdown(value);
  };

  const onChange: ChangeEventHandler = (e) => {
    console.log((e.target as HTMLInputElement).name);
    const target = e.target as HTMLInputElement;
    switch (target.name) {
      case 'title':
        setTitle(target.value);
        break;
      case 'description':
        setDescription(target.value);
        break;
    }
  };

  return (
    <>
      <h1>{id !== undefined ? `Edit [ID: ${id}]: ${title || ''}` : 'New article'}</h1>

      <StyledFormContainer>
        <StyledLabeledInput
          ref={titleField}
          label="Title"
          name="title"
          defaultValue={article?.title || ''}
          onChange={onChange}
          placeholder="Enter article title"
        />
        <StyledLabeledInput
          ref={descField}
          textarea
          label="Description"
          name="description"
          defaultValue={article?.description || ''}
          onChange={onChange}
          placeholder="Article description (optional)"
        />
      </StyledFormContainer>

      <MarkdownEditor
        ref={editor}
        value={article?.body || ''}
        visible
        height={'50vh'}
        onChange={onMDChange}
      />
      <ButtonsContainer align="center" justify="center">
        <Button onClick={doSave} disabled={!dirty && valid}>
          Save
        </Button>
        <Button onClick={doReset} disabled={!dirty}>
          Reset
        </Button>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </ButtonsContainer>
    </>
  );
};

export default Editor;

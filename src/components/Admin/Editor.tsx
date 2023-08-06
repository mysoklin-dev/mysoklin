/* eslint-disable global-require */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useRef } from 'react';

import ArticleCard from '@/components/ArticleCard';

interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string;
}

export default function Editor({
  onChange,
  editorLoaded,
  name,
  value,
}: CKeditorProps) {
  const editorRef = useRef<{
    CKEditor: typeof CKEditor;
    ClassicEditor: typeof ClassicEditor;
  }>();
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
  }, []);

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              'blockQuote',
            ],
            name,
          }}
        />
      ) : (
        <ArticleCard link="asdf" thumbnail="asdfs" text="asdfsd" title="" />
      )}
    </>
  );
}

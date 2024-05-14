/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import * as React from 'react';

import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';


const PlaceHolder = () => {
    return (
        <div className="plain-editor-placeholder">Enter your story...</div>
    )
}

const editorConfig = {
  namespace: 'Padanrrativ Plain Editor',
  nodes: [],
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // The editor theme
  theme: PlaygroundEditorTheme,
};

export default function PlainEditor() {
  return (
    <div id='plain-editor'>
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <div className="editor-inner">
                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor-input" />}
                    placeholder={<PlaceHolder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                </div>
            </div>
        </LexicalComposer>
    </div>

  );
}

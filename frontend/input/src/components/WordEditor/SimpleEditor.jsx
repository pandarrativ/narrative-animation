import React, { useState, useEffect } from "react";
import "./word-editor.css";
import "./index.css";
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import PlaygroundNodes from './nodes/PlaygroundNodes';

import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin/index';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import {LayoutPlugin} from './plugins/LayoutPlugin/LayoutPlugin';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';

import {CAN_USE_DOM} from './shared/canUseDOM';
import Placeholder from './ui/Placeholder';
import SimpleToolbarPlugin from "./plugins/SimpleToolbarPlugin/SimpleToolbarPlugin";


function SimpleEditor() {
    const initialConfig = {
        namespace: 'Pandarrative Word Editor',
        nodes: [...PlaygroundNodes],
        onError: (error) => {
          throw error;
        },
        theme: PlaygroundEditorTheme,
    };
    

    const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
    const [isSmallWidthViewport, setIsSmallWidthViewport] = useState(false);
    const onRef = (_floatingAnchorElem) => {
        if (_floatingAnchorElem !== null) {
        setFloatingAnchorElem(_floatingAnchorElem);
        }
    };
    useEffect(() => {
        const updateViewPortWidth = () => {
            const isNextSmallWidthViewport =
                CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

            if (isNextSmallWidthViewport !== isSmallWidthViewport) {
                setIsSmallWidthViewport(isNextSmallWidthViewport);
            }
        };

        updateViewPortWidth();
        window.addEventListener('resize', updateViewPortWidth);
    

        return () => {
            window.removeEventListener('resize', updateViewPortWidth);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSmallWidthViewport]);
    

    return (
        <div id="simple-editor">
            <LexicalComposer initialConfig={initialConfig}>
                <AutoFocusPlugin />
                <EmojiPickerPlugin />
                <AutoEmbedPlugin />
                <MentionsPlugin />
                <EmojisPlugin />
                <HashtagPlugin />
                <KeywordsPlugin />
                <HistoryPlugin />


                <div className="editor-shell">
                    <SimpleToolbarPlugin></SimpleToolbarPlugin>
                    <div className="editor-container">
                        <RichTextPlugin
                            contentEditable={
                                <div className="editor-scroller">
                                <div className="editor" ref={onRef}>
                                    <ContentEditable className="ContentEditable__root"/>
                                </div>
                                </div>
                            }
                            placeholder={<Placeholder>Enter your story...</Placeholder>}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                       
                        <ListPlugin />
                        <CheckListPlugin />
                        <ListMaxIndentLevelPlugin maxDepth={7} />
                        <HorizontalRulePlugin />
                        <TabIndentationPlugin />
                        <CollapsiblePlugin />
                        <LayoutPlugin />
                        {floatingAnchorElem && !isSmallWidthViewport && (
                            <>
                                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                                <TableCellActionMenuPlugin
                                anchorElem={floatingAnchorElem}
                                cellMerge={true}
                                />
                                <FloatingTextFormatToolbarPlugin
                                anchorElem={floatingAnchorElem}
                                />
                            </>
                        )}
                    
                    </div>
                </div>
            </LexicalComposer>
        </div>
    );
}

export default SimpleEditor;
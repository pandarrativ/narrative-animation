import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {mergeRegister} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {useCallback, useEffect, useRef, useState} from 'react';
import * as React from 'react';


import iconRotateLeft from "./icons/rotate-left.svg";
import iconRotateRight from "./icons/rotate-right.svg";
import iconBold from "./icons/bold.svg";
import iconItalic from "./icons/italic.svg";
import iconStrikeThrough from "./icons/strikethrough.svg";
import iconUnderscore from "./icons/underscore.svg";
import iconLeftAlign from "./icons/left-align.svg";
import iconRightAlign from "./icons/right-align.svg";
import iconCenterAlign from "./icons/center-align.svg";
import iconJustifyAlign from "./icons/justify-align.svg";

const LowPriority = 1;


export default function SimpleToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);


  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);


    //set font size
    const handleFontSize = (headingTagType) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(headingTagType));
            }
        });
    };
    
  return (
    <div className="toolbar" ref={toolbarRef}>
    <select className='toolbar-btn-select' onChange={(e) => handleFontSize(e.target.value)}>
        <option value="" className='font-size-normal'>Normal</option>
        <option value="h1" className='font-size-h1'>Heading1</option>
        <option value="h2" className='font-size-h2'>Heading2</option>
        <option value="h3" className='font-size-h3'>Heading3</option>
        <option value="h4" className='font-size-h4'>Heading4</option>
        <option value="h6" className='font-size-h5'>Heading5</option>
        {/* <option value="fontSizeSmall">Small</option> */}
    </select>

      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo">
        <img src={iconRotateLeft} alt="cancel"></img>
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo">
        <img src={iconRotateRight} alt="re-do"></img>
      </button>
      
        <div className='editor-toolbar-divider'></div>

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
        aria-label="Format Bold">
        <img src={iconBold} alt="bold"></img>
      </button>
      <button
        onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }}
        className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        aria-label="Format Italics">
        <img src={iconItalic} alt="italic"></img>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        aria-label="Format Underline">
        <img src={iconUnderscore} alt="underscore"></img>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
        aria-label="Format Strikethrough">
        <img src={iconStrikeThrough} alt="strike-through"></img>
      </button>

      <div className='editor-toolbar-divider'></div>

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className="toolbar-item spaced"
        aria-label="Left Align">
         <img src={iconLeftAlign} alt="left-align"></img>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className="toolbar-item spaced"
        aria-label="Center Align">
         <img src={iconCenterAlign} alt="center-align"></img>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className="toolbar-item spaced"
        aria-label="Right Align">
         <img src={iconRightAlign} alt="right-align"></img>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        className="toolbar-item"
        aria-label="Justify Align">
         <img src={iconJustifyAlign} alt="justify-align"></img>
      </button>{' '}
    </div>
  );
}
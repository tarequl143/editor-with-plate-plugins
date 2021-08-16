import { ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, getPlatePluginType, MARK_BOLD, MARK_ITALIC, MARK_UNDERLINE, ToolbarElement, ToolbarMark, useEventEditorId, useStoreEditorRef, ELEMENT_UL, ELEMENT_OL, MARK_CODE, MARK_STRIKETHROUGH, MARK_SUPERSCRIPT, MARK_SUBSCRIPT, MARK_HIGHLIGHT, someNode, ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_LINK,
  ELEMENT_TODO_LI,
  ToolbarList,
  getPreventDefaultHandler,
  toggleList,
} from "@udecode/plate";
import {GoBold} from "react-icons/go";
import {FiItalic, FiUnderline, FiCheckSquare} from "react-icons/fi";
import {AiOutlineStrikethrough, AiFillCode, AiOutlineExclamationCircle, AiOutlineLink, AiOutlineHighlight} from "react-icons/ai";
import {BiCheck, BiCodeAlt, BiLink, BiImage, BiCodeCurly} from "react-icons/bi";
import {ImSuperscript, ImSubscript} from "react-icons/im";
import {BsListOl, BsListUl} from "react-icons/bs";
import {IoMdQuote} from "react-icons/io";
import {
  ELEMENT_EXCALIDRAW,
} from '@udecode/plate-excalidraw';

import { TBallonToolbarContent } from "./InlineToolbarStyle";
import ToolbarCustomBtn from "./toolbarButtons/ToolbarCustomBtn";
import { CUSTOM_ELEMENT_HINT } from "../plugins/Hint/types";
import { CUSTOM_ELEMENT_BULLETED_LIST } from "../plugins/BulletedList/types";
import { CUSTOM_ELEMENT_ORDERED_LIST } from "../plugins/OrderedList/types";
import { CUSTOM_ELEMENT_TODO_LIST } from "../plugins/TodoList/types";
import { CUSTOM_ELEMENT_LINK } from "../plugins/Link/types";
import ToolbarLink from "./toolbarButtons/ToolbarLink";
import { useEffect, useRef, useState } from "react";
import { insertLink } from '../plugins/utils';
import ToolbarImageOption from "./toolbarButtons/ToolbarImageOption";

interface IBallonToolbarProps {
  linkSet?: any
  isOpenLinkFormSet?:any
  link?: string
  isOpenLinkForm?: boolean
  onLinkFormSubmit?: any
}

const SlashToolbar = (props:IBallonToolbarProps) => {

    const {linkSet, isOpenLinkFormSet, isOpenLinkForm, onLinkFormSubmit} = props;
    
    const editor = useStoreEditorRef(useEventEditorId('focus'));
  
  
    // useEffect(() => {
    //   if (isOpenLinkForm && editor) {
    //     editorSelection.current = editor.selection;
    //   }
    // }, [isOpenLinkForm]);
  
    // const onLinkFormSubmit = (e: any) => {
    //   e.preventDefault();
    //   editor?.selection = editorSelection.current;
    //   if (link) {
    //     insertLink(editor, link);
    //     setIsOpenLinkForm(false);
    //   }
    // };

    const tooltip:any = {
      arrow: true,
      delay: 0,
      duration: [200, 0],
      hideOnClick: false,
      offset: [0, 17],
      placement: 'top',
    };

    return (
        <TBallonToolbarContent>
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_H1)}
            icon={<><span className="icon" style={{fontSize: "14px"}}>H<sub style={{fontSize: "10px", fontWeight: 500, bottom: "-2px"}}>1</sub></span> <span>Heading 1</span></>}
            as="div"
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_H2)}
            icon={<><span className="icon" style={{fontSize: "14px"}}>H<sub style={{fontSize: "10px", fontWeight: 500, bottom: "-2px"}}>2</sub></span> <span>Heading 2</span></>}
            as="div"
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_H3)}
            icon={<><span className="icon" style={{fontSize: "14px"}}>H<sub style={{fontSize: "10px", fontWeight: 500, bottom: "-2px"}}>3</sub></span> <span>Heading 3</span></>}
            as="div"
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
            icon={<><span className="icon"><BiCodeCurly /></span> <span>Code Snippet</span></>}
            as="div"
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_BULLETED_LIST)}
            icon={<><span className="icon"><BsListUl /></span> <span>Bullet List</span></>}
            as="div"
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_ORDERED_LIST)}
            icon={<><span className="icon"><BsListOl /></span> <span>Numbered List</span></>}
            as="div"
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}
            icon={<><span className="icon"><IoMdQuote /></span> <span>Quote</span></>}
            as="div"
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_HINT)}
            icon={<><span className="icon"><AiOutlineExclamationCircle /></span> <span>Hint</span></>}
            as="div"
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_TODO_LIST)}
            icon={<><span className="icon"><FiCheckSquare /></span> <span>Checklist</span></>}
            as="div"
          />
          <ToolbarImageOption as="div" icon={<><span className="icon"><BiImage /></span> <span>Image</span></>} />
        </TBallonToolbarContent>
    )
};

export default SlashToolbar;
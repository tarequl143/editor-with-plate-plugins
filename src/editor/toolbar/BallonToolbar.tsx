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
import {BiCheck, BiCodeAlt, BiLink} from "react-icons/bi";
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

interface IBallonToolbarProps {
  linkSet?: any
  isOpenLinkFormSet?:any
  link?: string
  isOpenLinkForm?: boolean
  onLinkFormSubmit?: any
}

const BallonToolbar = (props:IBallonToolbarProps) => {

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

    return !isOpenLinkForm ? (
        <TBallonToolbarContent>
          <ToolbarMark
              type={getPlatePluginType(editor, MARK_BOLD)}
              icon={<GoBold />}
          />
          <ToolbarMark
              type={getPlatePluginType(editor, MARK_ITALIC)}
              icon={<FiItalic />}
          />
          <ToolbarMark
              type={getPlatePluginType(editor, MARK_UNDERLINE)}
              icon={<FiUnderline />}
          />
          <ToolbarMark
              type={getPlatePluginType(editor, MARK_STRIKETHROUGH)}
              icon={<AiOutlineStrikethrough />}
          />
          <ToolbarMark
              type={getPlatePluginType(editor, MARK_HIGHLIGHT)}
              icon={<AiOutlineHighlight />}
          />
          <ToolbarMark
              type={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
              clear={getPlatePluginType(editor, MARK_SUBSCRIPT)}
              icon={<ImSuperscript />}
          />
          <ToolbarMark
              type={getPlatePluginType(editor, MARK_SUBSCRIPT)}
              clear={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
              icon={<ImSubscript />}
          />
          <ToolbarMark
            type={getPlatePluginType(editor, MARK_CODE)}
            icon={<BiCodeAlt />}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_H1)}
            icon={"H1"}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_H2)}
            icon={"H2"}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_H3)}
            icon={"H3"}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
            icon={<AiFillCode />}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_BULLETED_LIST)}
            icon={<BsListUl />}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_ORDERED_LIST)}
            icon={<BsListOl />}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}
            icon={<IoMdQuote />}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_HINT)}
            icon={<AiOutlineExclamationCircle />}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_TODO_LIST)}
            icon={<FiCheckSquare />}
          />
          <ToolbarLink
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_LINK)}
            linkSet={props.linkSet}
            isLinkFormSet={isOpenLinkFormSet}
            icon={<AiOutlineLink />}
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_EXCALIDRAW)}
            icon={"X"}
          />
        </TBallonToolbarContent>
       ) : (
          <div className="absolute-field" id="link-form">
            <form onSubmit={(e) => onLinkFormSubmit(e)}>
              <div className="link-field">
                <span className="field-icon">
                  <BiLink />
                </span>
                <input
                  className={`link-input`}
                  type="url"
                  value={props.link}
                  onChange={(event: any) => linkSet(event.target.value)}
                  placeholder="https://"
                  autoFocus
                ></input>
                <button type="submit" className="submit">
                  <BiCheck />
                </button>
              </div>
            </form>
          </div>
        )
      
};

export default BallonToolbar
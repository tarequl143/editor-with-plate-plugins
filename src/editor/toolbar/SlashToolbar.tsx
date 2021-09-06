import { ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, getPlatePluginType, ToolbarTable, useEventEditorId, useStoreEditorRef } from "@udecode/plate";
import { FiCheckSquare} from "react-icons/fi";
import { GoMention} from "react-icons/go";
import { AiOutlineExclamationCircle, AiOutlineLine, AiOutlineTable } from "react-icons/ai";
import { BiImage, BiCodeCurly } from "react-icons/bi";

import {BsListOl, BsListUl, BsPencil} from "react-icons/bs";
import {IoMdQuote} from "react-icons/io";
import {
  ELEMENT_EXCALIDRAW,
} from '@udecode/plate-excalidraw';

import { TBallonToolbarContent } from "./ToolbarStyle";
import ToolbarCustomBtn from "./toolbarButtons/ToolbarCustomBtn";
import { CUSTOM_ELEMENT_HINT } from "../plugins/Hint/types";
import { CUSTOM_ELEMENT_BULLETED_LIST } from "../plugins/BulletedList/types";
import { CUSTOM_ELEMENT_ORDERED_LIST } from "../plugins/OrderedList/types";
import { CUSTOM_ELEMENT_TODO_LIST } from "../plugins/TodoList/types";
import ToolbarImageOption from "./toolbarButtons/ToolbarImageOption";
import { CUSTOM_ELEMENT_SEPERATOR } from "../plugins/Seperator/types";
import { CUSTOM_ELEMENT_MENTION_ITEM } from "../plugins/Mention/types";
import { insertTable } from "./toolbarButtons/TableActions";

interface IBallonToolbarProps {
  linkSet?: any
  isOpenLinkFormSet?:any
  link?: string
  isOpenLinkForm?: boolean
  onLinkFormSubmit?: any,
  removeSlashToolbar?:any
}

const SlashToolbar = (props:IBallonToolbarProps) => {

    const editor = useStoreEditorRef(useEventEditorId('focus'));

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
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
            icon={<><span className="icon"><BiCodeCurly /></span> <span>Code Snippet</span></>}
            as="div"
          />
          <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_MENTION_ITEM)}
            icon={<><span className="icon"><GoMention /></span> <span>Mention</span></>}
            as="div"
            onMouseDown={() => {
                if(editor) {
                  editor.deleteBackward("character");
                  props.removeSlashToolbar();
                  editor.insertText("@");
                }
            }}
          />
          <ToolbarTable as="div" icon={<><span className="icon"><AiOutlineTable /></span> <span>Table</span></>} transform={insertTable} />
          
          {/* <ToolbarCustomBtn
            type={getPlatePluginType(editor, CUSTOM_ELEMENT_SEPERATOR)}
            icon={<><span className="icon"><AiOutlineLine /></span> <span>Seperator</span></>}
            as="div"
          /> */}
          {/* <ToolbarElement
            type={getPlatePluginType(editor, ELEMENT_EXCALIDRAW)}
            icon={<><span className="icon"><BsPencil /></span> <span>Sketch</span></>}
            as="div"
          /> */}
          <ToolbarImageOption as="div" icon={<><span className="icon"><BiImage /></span> <span>Image</span></>} />
        </TBallonToolbarContent>
    )
};

export default SlashToolbar;
import { ELEMENT_PARAGRAPH, someNode } from "@udecode/plate";
import { CUSTOM_ELEMENT_BULLETED_LIST } from "../plugins/BulletedList/types";
import { CUSTOM_ELEMENT_ORDERED_LIST } from "../plugins/OrderedList/types";
import { CUSTOM_ELEMENT_LIST_ITEM } from "../plugins/ListItem/types";
import { Transforms } from "slate";
import { CUSTOM_ELEMENT_TODO_LIST } from "../plugins/TodoList/types";
import { CUSTOM_ELEMENT_SEPERATOR } from "../plugins/Seperator/types";
import { CUSTOM_ELEMENT_MENTION_ITEM } from "../plugins/Mention/types";
const LIST_TYPES = [CUSTOM_ELEMENT_ORDERED_LIST, CUSTOM_ELEMENT_BULLETED_LIST];

export const isBlockActive = (editor: any, format: any) => {
    const match: any = !!editor?.selection && someNode(editor, { match: { type: format } });
  
    return !!match;
};

export const toggleBlock = (editor: any, format: any) => {

    // editor.isVoid = (element: any) => element.type === CUSTOM_ELEMENT_SEPERATOR;

    const isActive = isBlockActive(editor, format);
    
    const isList = LIST_TYPES.includes(format);
  
    Transforms.unwrapNodes(editor, {
      match: (n: any) => LIST_TYPES.includes(n.type),
      split: true,
    });
    let newProperties: any;
    if(format === CUSTOM_ELEMENT_TODO_LIST) {
        if(isActive) {
            newProperties = {
                type: ELEMENT_PARAGRAPH,
            };
            Transforms.unsetNodes(editor, "checked");
        } else {
            newProperties = {
                type: CUSTOM_ELEMENT_TODO_LIST,
                checked: false
            };
        }
    } else if(format === CUSTOM_ELEMENT_SEPERATOR) {
        newProperties = {
            type: CUSTOM_ELEMENT_SEPERATOR,
            children: [{text:""}]
        };
        Transforms.unsetNodes(editor, ["checked", "children"]);
    } else {
        newProperties = {
            type: isActive ? ELEMENT_PARAGRAPH : isList ? CUSTOM_ELEMENT_LIST_ITEM : format,
        };
        Transforms.unsetNodes(editor, "checked");
    } 

    console.log(newProperties);
    
    Transforms.setNodes(editor, newProperties);
    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
};

export const insertMention = (editor: any, character: string) => {    
    editor.isInline = (element: any) => element.type === CUSTOM_ELEMENT_MENTION_ITEM;
    editor.isVoid = (element: any) => element.type === CUSTOM_ELEMENT_MENTION_ITEM;
    const mention: any = {
      type: CUSTOM_ELEMENT_MENTION_ITEM,
      character,
      url: "https://thiswillbementionurl.url",
      children: [{ text: "" }],
    };
    Transforms.insertNodes(editor, mention);
    Transforms.move(editor);
  };

  
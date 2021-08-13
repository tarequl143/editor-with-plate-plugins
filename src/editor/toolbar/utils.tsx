import { ELEMENT_PARAGRAPH, someNode } from "@udecode/plate";
import { CUSTOM_ELEMENT_BULLETED_LIST } from "../plugins/BulletedList/types";
import { CUSTOM_ELEMENT_ORDERED_LIST } from "../plugins/OrderedList/types";
import { CUSTOM_ELEMENT_LIST_ITEM } from "../plugins/ListItem/types";
import { Transforms, Range } from "slate";
import { CUSTOM_ELEMENT_TODO_LIST } from "../plugins/TodoList/types";
const LIST_TYPES = [CUSTOM_ELEMENT_ORDERED_LIST, CUSTOM_ELEMENT_BULLETED_LIST];

export const isBlockActive = (editor: any, format: any) => {
    const match: any = !!editor?.selection && someNode(editor, { match: { type: format } });
  
    return !!match;
};

export const toggleBlock = (editor: any, format: any) => {

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

// export const validURL = (str: string) => {
//     var pattern = new RegExp(
//       "^(https?:\\/\\/)?" + // protocol
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//         "(\\#[-a-z\\d_]*)?$",
//       "i"
//     ); // fragment locator
//     return !!pattern.test(str);
//   };
  
//   // Is Link Active
//   export const isLinkActive = (editor: any) => {
//     const [link]: any = !!editor?.selection && someNode(editor, { match: { type: "custom_elem_link" } });
//     return !!link;
//   };
  
//   // Remove Link if Link is Active
//   export const unwrapLink = (editor: any) => {
//     Transforms.unwrapNodes(editor, { match: (n) => n.type === "custom_elem_link" });
//   };
  
//   // Toggle Link
//   export const wrapLink = (editor: any, url: any) => {
//     if (isLinkActive(editor)) {
//       unwrapLink(editor);
//     }
  
//     const { selection } = editor;
//     const isCollapsed = selection && Range.isCollapsed(selection);
//     const link = {
//       type: "custom_elem_link",
//       url,
//       children: isCollapsed ? [{ text: url }] : [],
//     };
  
//     if (isCollapsed) {
//       Transforms.insertNodes(editor, link);
//     } else {
//       Transforms.wrapNodes(editor, link, { split: true });
//       Transforms.collapse(editor, { edge: "end" });
//     }
//   };
  
//   // Insert Link
//   export const insertLink = (editor: any, url: string) => {
//     if (editor.selection) {
//       wrapLink(editor, url);
//     }
//   };
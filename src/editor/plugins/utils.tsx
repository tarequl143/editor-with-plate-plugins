import { someNode } from "@udecode/plate";
import { Editor, Transforms, Range } from "slate";
import { CUSTOM_ELEMENT_LINK } from "./Link/types";

export const validURL = (str: string) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };
  
  // Is Link Active
  export const isLinkActive = (editor: any) => {
    const [link]: any = Editor.nodes(editor, { match: (n:any) => {
        console.log("IsLinkActive Console", n);
        
        return n.type === CUSTOM_ELEMENT_LINK
    } });
    return !!link;
  };
  
  // Remove Link if Link is Active
  export const unwrapLink = (editor: any) => {
    Transforms.unwrapNodes(editor, { match: (n:any) => {
        console.log("Unwrap Console", n);
        
        return n.type === CUSTOM_ELEMENT_LINK
    } });
  };
  
  // Toggle Link
  export const wrapLink = (editor: any, url: any) => {
    if (isLinkActive(editor)) {
      unwrapLink(editor);
    }
  
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link = {
      type: CUSTOM_ELEMENT_LINK,
      url,
      children: isCollapsed ? [{ text: url }] : [],
    };
  
    if (isCollapsed) {
        console.log("IsCollapsed Console", link);
        
      Transforms.insertNodes(editor, link);
    } else {
        console.log("UnCollapsed Console", link);
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  };
  
  // Insert Link
  export const insertLink = (editor: any, url: string) => {
      console.log(editor.selection);
      
    if (editor.selection) {
      wrapLink(editor, url);
    }
  };
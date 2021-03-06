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
        return n.type === CUSTOM_ELEMENT_LINK
    } });
  };
  
  // Toggle Link
  export const wrapLink = (editor: any, url: any) => {
    if (isLinkActive(editor)) {
      unwrapLink(editor);
    }

    editor.isInline = (element: any) => element.type === CUSTOM_ELEMENT_LINK;
  
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link = {
      type: CUSTOM_ELEMENT_LINK,
      url,
      children: isCollapsed ? [{ text: url }] : [],
    };
  
    if (isCollapsed) {    
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  };
  
  // Insert Link
  export const insertLink = (editor: any, url: string) => {
      
    if (editor.selection) {
      wrapLink(editor, url);
    }
  };
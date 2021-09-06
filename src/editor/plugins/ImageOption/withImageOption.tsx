import { SPEditor, WithOverride } from "@udecode/plate";
import { ReactEditor } from "slate-react";

export const withImageOption = (): WithOverride<ReactEditor & SPEditor> => (
    editor
  ) => {
    const { isVoid } = editor;
  
    // editor.isVoid = (element: any) => {
    //     return element.type === "custom_elem_image_option" ? true : isVoid(element);
    // };
  
    return editor;
  };
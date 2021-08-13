import { isUrl, SPEditor, WithOverride } from "@udecode/plate";
import { ReactEditor } from "slate-react";
import { wrapLink } from "../utils";
import { CUSTOM_ELEMENT_LINK } from "./types";

export const withLink = (): WithOverride<ReactEditor & SPEditor> => (
    editor
  ) => {
    const { insertData, insertText, isInline } = editor

  editor.isInline = (element:any) => {
    return element.type === CUSTOM_ELEMENT_LINK ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  
    return editor;
  };
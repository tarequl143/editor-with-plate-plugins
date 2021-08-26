import { ELEMENT_PARAGRAPH, ToolbarButtonProps, ToolbarElement, useEventEditorId, useStoreEditorRef, insertNodes, TElement } from "@udecode/plate";
import { BaseEditor, BaseRange, Transforms, Location } from "slate";
import { ReactEditor } from "slate-react";
import { CUSTOM_ELEMENT_IMAGE_OPTION } from "../../plugins/ImageOption/types";
import { isLinkActive, unwrapLink } from "../../plugins/utils";

const ToolbarLink = ({
    type = CUSTOM_ELEMENT_IMAGE_OPTION,
    linkSet,
    isLinkFormSet,
    lastSelection,
    ...props
  }: ToolbarButtonProps & { type?: string }) => {
    
    const editor = useStoreEditorRef(useEventEditorId('focus'));

    return (
        <ToolbarElement type={type}
          onMouseDown={(event) => {
            if(event.button === 0){
              if (isLinkActive(editor)) {
                unwrapLink(editor);
                linkSet("");
              } else {
                if(!editor) return;
                isLinkFormSet(true)       
              }
            }
          }}
          {...props}
        />
    )
};

export default ToolbarLink;
import { ELEMENT_PARAGRAPH, ToolbarButtonProps, ToolbarElement, useEventEditorId, useStoreEditorRef, insertNodes, TElement } from "@udecode/plate";
import { CUSTOM_ELEMENT_IMAGE_OPTION } from "../../plugins/ImageOption/types";
import { isLinkActive, unwrapLink } from "../../plugins/utils";

const ToolbarLink = ({
    type = CUSTOM_ELEMENT_IMAGE_OPTION,
    linkSet,
    isLinkFormSet,
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
                isLinkFormSet(true)
              }
            }
          }}
          {...props}
        />
    )
};

export default ToolbarLink;
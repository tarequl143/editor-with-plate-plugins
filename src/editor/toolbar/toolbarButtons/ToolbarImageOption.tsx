import { ELEMENT_PARAGRAPH, ToolbarButtonProps, ToolbarElement, useEventEditorId, useStoreEditorRef, insertNodes, TElement } from "@udecode/plate";
import { CUSTOM_ELEMENT_IMAGE_OPTION } from "../../plugins/ImageOption/types";

const ToolbarImageOption = ({
    type = CUSTOM_ELEMENT_IMAGE_OPTION,
    ...props
  }: ToolbarButtonProps & { type?: string }) => {
    
    const editor = useStoreEditorRef(useEventEditorId('focus'));

    return (
        <ToolbarElement type={type}
          onMouseDown={(event) => {
            if (!editor) return;
            event.preventDefault();
            editor.deleteBackward("character");
            const text = { text: "Please choose an option to add an image" };
            const emptyText = { text: "" };
            insertNodes(editor, {
              type,
              children: [text],
            });
            insertNodes<TElement>(editor, {
              type: ELEMENT_PARAGRAPH,
              children: [emptyText],
            });
          }}
          {...props}
        />
    )
};

export default ToolbarImageOption;
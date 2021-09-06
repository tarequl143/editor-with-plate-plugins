import { ELEMENT_PARAGRAPH, ToolbarButtonProps, ToolbarElement, useEventEditorId, useStoreEditorRef, insertNodes, TElement, getAbove, getPlatePluginType } from "@udecode/plate";
import { Editor, Transforms } from "slate";
import { CUSTOM_ELEMENT_BULLETED_LIST } from "../../plugins/BulletedList/types";
import { CUSTOM_ELEMENT_IMAGE_OPTION } from "../../plugins/ImageOption/types";
import { CUSTOM_ELEMENT_ORDERED_LIST } from "../../plugins/OrderedList/types";
const LIST_TYPES = [CUSTOM_ELEMENT_ORDERED_LIST, CUSTOM_ELEMENT_BULLETED_LIST];

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
            const currentNode = getAbove(editor);
            const currentNodePath = currentNode?.[1]?.[0];
            const insertAt = [currentNodePath as number + 1];  
            const text = { text: "Please choose an option to add an image" };
            const emptyText = { text: "" };
            console.log(currentNodePath);
            
            insertNodes(editor, {
              type,
              children: [text],
            },
            {
              at: insertAt
            });
            insertNodes<TElement>(editor, {
              type: ELEMENT_PARAGRAPH,
              children: [emptyText],
              select: true
            },{
              at: [currentNodePath as number + 2]
            });
          }}
          {...props}
        />
    )
};

export default ToolbarImageOption;
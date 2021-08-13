import { ToolbarButtonProps, ToolbarElement, useEventEditorId, useStoreEditorRef } from "@udecode/plate";
import { toggleBlock } from "../utils";

const ToolbarCustomBtn = ({
    type,
    ...props
  }: ToolbarButtonProps & { type?: string }) => {

    const editor = useStoreEditorRef(useEventEditorId('focus'));

    return (
        <ToolbarElement type={type as string}
          onMouseDown={(e) => {
            if(e.button === 0){
            e.preventDefault();
            toggleBlock(editor, type);
            }
          }}
          {...props}
        />
    )
};

export default ToolbarCustomBtn;
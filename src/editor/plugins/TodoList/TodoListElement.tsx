import { useEventEditorId, useStoreEditorRef } from "@udecode/plate";
import { Transforms } from "slate";
import { useReadOnly, ReactEditor } from "slate-react";

const TodoListElement = (props: any) => {
    const editor = useStoreEditorRef(useEventEditorId('focus'));
  const { attributes, children, element } = props;
  
  const readOnly = useReadOnly();
  const { checked } = element;
  
  return (
    <div {...attributes} className="custom-element checklist-element">
      <div className="checklist-element-wrap">
        <span contentEditable={false} className="checkbox-wrap">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) => {
                if(!editor) return;
              const path = ReactEditor.findPath(editor, element);
              const newProperties: any = {
                checked: event.target.checked,
              };
              Transforms.setNodes(editor, newProperties, { at: path });
            }}
          />
          <span className="editor-checkbox"></span>
        </span>
        <span contentEditable={!readOnly} suppressContentEditableWarning>
          {children}
        </span>
      </div>
    </div>
  );
};

export default TodoListElement;

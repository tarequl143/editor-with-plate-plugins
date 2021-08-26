import React from "react";
import { BiFile } from "react-icons/bi";

function MentionItem(props: any) {
  const { name, icon, info, className, onMouseDown, index } = props;
  
  return (
    <div
      className={`mention-item ${className ? className : ""}`}
      onMouseDown={(e) => {
        if(e.button === 0){
        onMouseDown(index);
        }
      }}
      contentEditable="false"
      suppressContentEditableWarning={true}
    >
      <div className="item-icon">{icon ? icon : <BiFile />}</div>
      <div className="item-info">
        <h6>{name ? name : "Untitled"}</h6>
        <p>{info ? info : "This doc has no info"}</p>
      </div>
    </div>
  );
}

export default MentionItem;

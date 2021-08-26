import { useFocused, useSelected } from "slate-react";

const MentionElement = (props: any) => {
  const { attributes, children, element } = props;
  const selected = useSelected();
  const focused = useFocused();

  console.log(element);
  
  return (
    <span
      {...attributes}
      className={`relative mention ${selected && focused ? "selected" : ""}`}
    >
      @{element.character}
      <a
        href={element.url}
        className="mentioned-url"
        target="_blank"
        contentEditable="false"
        rel="noreferrer"
        suppressContentEditableWarning={true}
      >
        {element.character}
      </a>
      {children}
    </span>
  );
};

export default MentionElement;

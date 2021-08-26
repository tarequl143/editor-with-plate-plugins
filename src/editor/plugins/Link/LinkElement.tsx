const LinkElement = (props: any) => {
  const { attributes, children, element } = props;
  
  return (
    <span {...attributes} className="custom-element link-element relative">
      <a
        href={element.url}
        className="absolute-view"
        target="_blank"
        contentEditable="false"
        rel="noreferrer"
        suppressContentEditableWarning={true}
      >
        {element.url}
      </a>
      {children}
    </span>
  );
};

export default LinkElement;

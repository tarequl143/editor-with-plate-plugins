const LinkElement = (props: any) => {
  const { attributes, children, element } = props;
  console.log(children);
  console.log(element);
  
  return (
    <span {...attributes} className="relative link">
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

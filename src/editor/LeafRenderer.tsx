import { DefaultLeaf, RenderLeafProps } from "slate-react";

export const LeafRendere = ({leaf, attributes, children, ...otherProps}: RenderLeafProps) => {
  
  if (leaf.hasOwnProperty('bold') && (leaf as any).bold) {
    return <span {...attributes}><strong>{children}</strong></span>
  }
  if (leaf.hasOwnProperty('italic') && (leaf as any).italic) {
    return <span {...attributes}><em>{children}</em></span>
  }
  if (leaf.hasOwnProperty('underline') && (leaf as any).underline) {
    return <span {...attributes}><u>{children}</u></span>
  }
  if (leaf.hasOwnProperty('code') && (leaf as any).code) {
    return <span {...attributes}><code>{children}</code></span>
  }
  if (leaf.hasOwnProperty('highlight') && (leaf as any).highlight) {
    return <span {...attributes}><mark>{children}</mark></span>
  }
  if (leaf.hasOwnProperty('strikethrough') && (leaf as any).strikethrough) {
    return <span {...attributes}><del>{children}</del></span>
  }
  if (leaf.hasOwnProperty('superscript') && (leaf as any).superscript) {
    return <span {...attributes}><sup>{children}</sup></span>
  }
  if (leaf.hasOwnProperty('subscript') && (leaf as any).subscript) {
    return <span {...attributes}><sub>{children}</sub></span>
  }
  if (leaf.hasOwnProperty('highlighted') && (leaf as any).highlighted) {
    return <span {...attributes} style={{background: "#a9f4be"}}>{children}</span>
  }
  if (leaf.hasOwnProperty('placeholder') && (leaf as any).placeholder && children?.props?.parent?.type === "p") {
    return (
      <>
        <DefaultLeaf leaf={leaf} attributes={attributes} children={children} {...otherProps} />
        <span
          className="placeholder"
          style={{ opacity: 0.3, position: "absolute", top: "50%", transform: "translateY(-50%)" }}
          contentEditable={false}
        >
          Type / to browse options
        </span>
      </>
    );
  }
  return <DefaultLeaf leaf={leaf} attributes={attributes} children={children} {...otherProps} />
}
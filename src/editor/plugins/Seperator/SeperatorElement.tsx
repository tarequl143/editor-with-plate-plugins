import { useFocused, useSelected } from "slate-react";

const SeperatorElement = (props: any) => {
  
    const { attributes, children } = props;
    const selected = useSelected();
    const focused = useFocused();
    
    return (
        <div {...attributes} className="custom-element seperator-element">
        <span className="display-none">{children}</span>
        <div className={`seperator-element-wrap ${selected && focused ? "selected" : ""}`}>
            <hr></hr>
            
        </div>
        </div>
    );
};

export default SeperatorElement;

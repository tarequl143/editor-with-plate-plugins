import { useFocused, useSelected } from "slate-react";
import { BiAlarmExclamation } from "react-icons/bi";


const HintElement = (props: any) => {
  
    const { attributes, children } = props;
    const selected = useSelected();
    const focused = useFocused();
    
    return (
        <div {...attributes} className="custom-element hint-element">
        <div className={`hint-element-wrap ${selected && focused ? "selected" : ""}`}>
            <span
            contentEditable={false}
            className="hint-icon"
            suppressContentEditableWarning
            >
            <BiAlarmExclamation />
            </span>
            {children}
        </div>
        </div>
    );
};

export default HintElement;

import { useFocused, useSelected, useSlate } from "slate-react";

const OrderedListElement = (props: any) => {
    const { attributes, children } = props;
    const selected = useSelected();
    const focused = useFocused();
    
    return (
        <div {...attributes} className="custom-element ordered-list-element">
            <div className={`ordered-list-element-wrap ${selected && focused ? "selected" : ""}`}>
                <ol>{children}</ol>
            </div>
        </div>
    );
};

export default OrderedListElement;

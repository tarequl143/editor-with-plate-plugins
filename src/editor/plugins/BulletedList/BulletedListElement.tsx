import { useFocused, useSelected, useSlate } from "slate-react";

const BulletedListElement = (props: any) => {
    const { attributes, children } = props;
    const selected = useSelected();
    const focused = useFocused();
    
    return (
        <div {...attributes} className="custom-element bulleted-list-element">
            <div className={`bulleted-list-element-wrap ${selected && focused ? "selected" : ""}`}>
                <ul>{children}</ul>
            </div>
        </div>
    );
};

export default BulletedListElement;

import { TdElem, TdInnerWrap } from "./TableStyle";


const TdElement = (props: any) => {
    const { attributes, children } = props;
    console.log(props);
    
    return (
        <TdElem {...attributes}><TdInnerWrap>{children}</TdInnerWrap></TdElem>
    );
};

export default TdElement;

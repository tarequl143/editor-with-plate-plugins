import { TrElem } from "./TableStyle";


const TrElement = (props: any) => {
    const { attributes, children } = props;
    console.log(props);
    
    return (
        <TrElem {...attributes}>{children}</TrElem>
    );
};

export default TrElement;

import styled from "styled-components";

export const CustomParagraphElement = styled.p`
    margin: 0;
    line-height: 26px;
`

const ParagraphElement = (props: any) => {
    const { attributes, children } = props;
    
    return (
        <CustomParagraphElement {...attributes} className="custom-element custom-paragraph-element">
            {children}
        </CustomParagraphElement>
    );
};

export default ParagraphElement;

import { ELEMENT_H1, TRenderElementProps } from "@udecode/plate";
import HintElement from "../Hint/HintElement";
import { CUSTOM_ELEMENT_HINT } from "../Hint/types";
import ImageElementOption from "../ImageOption/ImageElementOption";
import { CUSTOM_ELEMENT_IMAGE_OPTION } from "../ImageOption/types";
import ParagraphElement from "../Paragraph/ParagraphElement";
import BulletedListElement from "../BulletedList/BulletedListElement";
import { CUSTOM_ELEMENT_BULLETED_LIST } from "../BulletedList/types";
import ListItemElement from "../ListItem/ListItemElement";
import TodoListElement from "../TodoList/TodoListElement";
import OrderedListElement from "../OrderedList/OrderedListElement";
import { CUSTOM_ELEMENT_LIST_ITEM } from "../ListItem/types";
import { CUSTOM_ELEMENT_ORDERED_LIST } from "../OrderedList/types";
import { CUSTOM_ELEMENT_TODO_LIST } from "../TodoList/types";
import { CUSTOM_ELEMENT_LINK } from "../Link/types";
import LinkElement from "../Link/LinkElement";

export const RenderCustomElement = (editor: any) => (props: TRenderElementProps) => {
    const { element } = props;
    
    switch(element.type) {
        case CUSTOM_ELEMENT_IMAGE_OPTION:
            return <ImageElementOption {...props} />;
        case CUSTOM_ELEMENT_HINT:
            return <HintElement {...props} />;
        case CUSTOM_ELEMENT_BULLETED_LIST:
            return <BulletedListElement {...props} />;
        case CUSTOM_ELEMENT_ORDERED_LIST:
            return <OrderedListElement {...props} />;
        case CUSTOM_ELEMENT_TODO_LIST:
            return <TodoListElement {...props} />;
        case CUSTOM_ELEMENT_LIST_ITEM:
            return <ListItemElement {...props} />;
        case CUSTOM_ELEMENT_LINK:
            return <LinkElement {...props} />;
        default:
            return <ParagraphElement {...props} />;
    }
};
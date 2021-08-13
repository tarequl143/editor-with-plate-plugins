import { ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_PARAGRAPH, MARK_BOLD, MARK_CODE, MARK_HIGHLIGHT, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE } from "@udecode/plate";
import { CUSTOM_ELEMENT_BULLETED_LIST } from "./plugins/BulletedList/types";
import { CUSTOM_ELEMENT_HINT } from "./plugins/Hint/types";
import { CUSTOM_ELEMENT_LIST_ITEM } from "./plugins/ListItem/types";
import { CUSTOM_ELEMENT_ORDERED_LIST } from "./plugins/OrderedList/types";
import { CUSTOM_ELEMENT_TODO_LIST } from "./plugins/TodoList/types";

export const initialValue = [
    {
        type: ELEMENT_H1,
        children: [
            {text: "This is "},
            {text: "Heading one ", [MARK_BOLD]: true},
            {text: "content"}
        ]
    },
    {
        type: ELEMENT_H2,
        children: [
            {text: "This is "},
            {text: "Heading two ", [MARK_ITALIC]: true},
            {text: "content"}
        ]
    },
    {
        type: ELEMENT_H3,
        children: [
            {text: "This is "},
            {text: "Heading three ", [MARK_UNDERLINE]: true},
            {text: "content"}
        ]
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {text: "This is "},
            {text: "Paragraph", [MARK_BOLD]: true},
            {text: " content"}
        ]
    },
    {
        type: ELEMENT_CODE_BLOCK,
        children: [
            {text: "This is "},
            {text: "Code Block ", [MARK_STRIKETHROUGH]: true},
            {text: "content"}
        ]
    },
    {
        type: CUSTOM_ELEMENT_BULLETED_LIST,
        children:[
            {   
                type: CUSTOM_ELEMENT_LIST_ITEM,
                children: [
                    {text: "This is "},
                    {text: "Custom Bulleted List Item", [MARK_HIGHLIGHT]: true},
                    {text: " content"}
                ]
            },
            {   
                type: CUSTOM_ELEMENT_LIST_ITEM,
                children: [
                    {text: "This is "},
                    {text: "Custom Bulleted List Item", [MARK_BOLD]: true},
                    {text: " content 02"}
                ]
            }
        ]
    },
    {
        type: CUSTOM_ELEMENT_ORDERED_LIST,
        children:[
            {   
                type: CUSTOM_ELEMENT_LIST_ITEM,
                children: [
                    {text: "This is Custom Ordered"},
                    {text: "List", [MARK_SUPERSCRIPT]: true},
                    {text: "Item content"}
                ]
            },
            {   
                type: CUSTOM_ELEMENT_LIST_ITEM,
                children: [
                    {text: "This is Custom Ordered"},
                    {text: "List", [MARK_SUBSCRIPT]: true},
                    {text: "Item content"}
                ]
            }
        ]
    },
    {
        type: ELEMENT_BLOCKQUOTE,
        children:[
            {text: "This is"},
            {text: "blockquote", [MARK_CODE]: true},
            {text: "content"},
        ]
    },
    {
        type: CUSTOM_ELEMENT_HINT,
        children:[
            {text: "This is "},
            {text: "Custom Hint Element", [MARK_HIGHLIGHT]: true},
            {text: " content"},
        ]
    },
    {
        type: CUSTOM_ELEMENT_TODO_LIST,
        children:[
            {text: "This is "},
            {text: "Custom "},
            {text: "Todo", [MARK_BOLD]: true},
            {text: " Element content"},
        ]
    },
  ]
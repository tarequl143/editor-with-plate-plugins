import {
    createBlockquotePlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createHistoryPlugin,
    createImagePlugin,
    createItalicPlugin,
    createParagraphPlugin,
    createPlateComponents,
    createPlateOptions,
    createReactPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
    Plate,
    createSoftBreakPlugin,
    createExitBreakPlugin,
    createSubscriptPlugin,
    createHighlightPlugin,
    createSuperscriptPlugin,
    createKbdPlugin,
    createNodeIdPlugin,
    createAutoformatPlugin,
    createResetNodePlugin,
    createBasicElementPlugins,
    ELEMENT_PARAGRAPH,
    withProps,
    StyledElement,
    createLinkPlugin,
    SPEditor,
    createTablePlugin,
    getAbove,
    getPlatePluginType,
    ELEMENT_H1,
    ELEMENT_DEFAULT,
    insertNodes,
    ELEMENT_CODE_BLOCK,
    ELEMENT_BLOCKQUOTE,
    TElement
} from '@udecode/plate';
import {initialValue} from "./InitialValue";
import {
    createExcalidrawPlugin,
    ELEMENT_EXCALIDRAW,
    ExcalidrawElement,
  } from '@udecode/plate-excalidraw';
import { Editor, Range, Location, Path, Text, createEditor, BaseEditor, BaseRange, BaseElement } from "slate";
import "./editor.css";
import { useCallback, useEffect, useRef, useState } from 'react';
import { EditorWrapper } from "./EditorIndex.style"
import { createImageOptionPlugin } from "./plugins/ImageOption/createImageOptionPlugin";
import BallonToolbar from "./toolbar/BallonToolbar";
import { TBallonToolbar, SlashToolbarWrapper } from './toolbar/ToolbarStyle';
import { ReactEditor } from 'slate-react';
import { optionsExitBreakPlugin, optionsResetBlockTypePlugin, optionsSoftBreakPlugin } from './config/PluginOptions';
import { optionsAutoformat } from './config/AutoFormatRules';
import { CustomParagraphElement } from './plugins/Paragraph/ParagraphElement';
import { insertLink } from './plugins/utils';
import { Transforms } from 'slate';
import SlashToolbar from './toolbar/SlashToolbar';
import { CHARACTERS } from "./toolbar/Characters";
import { insertMention } from './toolbar/utils';
import MentionItem from './plugins/Mention/MentionItem';
import { useMemo } from 'react';
import { LeafRendere } from './LeafRenderer';
import { addRowBefore } from './toolbar/toolbarButtons/TableActions';
import { CUSTOM_ELEMENT_ORDERED_LIST } from './plugins/OrderedList/types';
import { CUSTOM_ELEMENT_BULLETED_LIST } from './plugins/BulletedList/types';
import { CUSTOM_ELEMENT_LIST_ITEM } from './plugins/ListItem/types';
import { CUSTOM_ELEMENT_TODO_LIST } from './plugins/TodoList/types';
import { CUSTOM_ELEMENT_HINT } from './plugins/Hint/types';
const LIST_TYPES = [CUSTOM_ELEMENT_ORDERED_LIST, CUSTOM_ELEMENT_BULLETED_LIST];


// All Plguins
const plugins = [
    ...createBasicElementPlugins(),
    
    // editor
    createReactPlugin(),
    createHistoryPlugin(),

    // elements
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createExcalidrawPlugin(),
    createImagePlugin(),
    createImageOptionPlugin(),
    createKbdPlugin(),
    createNodeIdPlugin(),
    createLinkPlugin(),
    createTablePlugin(),
   
    // marks
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createHighlightPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),

    createExitBreakPlugin(optionsExitBreakPlugin),
    createSoftBreakPlugin(optionsSoftBreakPlugin),
    createAutoformatPlugin(optionsAutoformat),
    createResetNodePlugin(optionsResetBlockTypePlugin),

    // Custom Plugins
    // createBulletedListPlugin()

];


const EditorIndex = () => {

    // Editor Value
    const [value, setValue] = useState<string | null>(null);

    // Editor Creating
    const editor = useMemo(() => createEditor(), []) as SPEditor & BaseEditor & ReactEditor;

    // @ and / Toolbar Necessary States and Refs
    const ballonToolberRef:any = useRef();
    const slashToolbarRef:any = useRef();
    const mentionToolbarRef:any = useRef();
    const [target, setTarget] = useState<any>("");
    const [defaultToolbarTarget, setDefaultToolbarTarget] = useState<any>("");
    const [index, setIndex] = useState<number>(0);
    const [toolbarLeft, setToolbarLeft] = useState<number>(0);
    
    // Set DefaultToolbarTarget null
    const setDefaultToolbarTargetFunc = () => {
      setDefaultToolbarTarget(null);
    }
  
    // Necessary States for Link element
    const [link, setLink] = useState<string>("");
    const [isOpenLinkForm, setIsOpenLinkForm] = useState<boolean>(false);
    const editorSelection = useRef(editor?.selection);
    const [lastSelection, setLastSelection] = useState<Range | null>(null);

    // On Change Link Value
    const setLinkFunc = (url: "") => {
      setLink(url);
    }

    // Link form toggler
    const setIsOpenLinkFormFunc = (value:boolean) => {
      setIsOpenLinkForm(value);
    }

    // Set Last Selection To State to decorate selected leaf
    useEffect(() => {
      if(editor.selection !== null) {
        setLastSelection(editor.selection);
      }
    }, [editor.selection]);


    // If Link Form Open
    useEffect(() => {
      if (isOpenLinkForm) {
        editorSelection.current = editor?.selection;
        if(!editor) return;
        Transforms.select(editor, editorSelection.current as Location);
      }
    }, [isOpenLinkForm]);


    // On Click Link Form
    const onLinkFormSubmit = (e: any) => {
      e.preventDefault();
      if(!editor) return;
      Transforms.select(editor, editorSelection.current as Location);

      if (link) {
        insertLink(editor, link);
        setIsOpenLinkFormFunc(false);
        console.log(link);
        
      }
    };


    // Ballon Toolbar Toggoler
    const toggleBallonToolbar = () => {
        if(!editor) {
          return;
        }
        const elem: any = ballonToolberRef.current;
        const { selection } = editor;
    
        if (!elem) {
          return;
        }

        const EditorId:any = document.getElementById("editor");

        if (
          !selection ||
          !ReactEditor.isFocused(editor) ||
          Range.isCollapsed(selection) ||
          Editor.string(editor, selection) === ""
        ) {
          if (isOpenLinkForm) {
            let newLeft = 0;

            if(toolbarLeft - 150 <= EditorId.offsetLeft) {
              newLeft = EditorId.offsetLeft;
            } else if(toolbarLeft - 150 >= EditorId.offsetLeft + EditorId.offsetWidth - 300) {
              newLeft = EditorId.offsetLeft + EditorId.offsetWidth - 300
            } else {
              newLeft = toolbarLeft - 150
            }
            
            elem.style.left = `${newLeft}px`;
            return;
          }
          elem.removeAttribute("style");
          return;
        }
    
        setIsOpenLinkForm(false);
        setLink("");
    
        const domSelection: any = window.getSelection();
        
        const rect = domSelection.getRangeAt(0).getBoundingClientRect();
        
        let ToolbarLeft:number = 0;
        
        const ToolbarTop = rect.top + window.pageYOffset - elem.offsetHeight - 12;

        if((rect.left + window.pageXOffset + rect.width / 2 - elem.offsetWidth / 2) <= EditorId.offsetLeft) {
            ToolbarLeft = EditorId.offsetLeft;
        } else if((rect.left + window.pageXOffset + rect.width / 2 - elem.offsetWidth / 2) >= EditorId.offsetLeft + EditorId.offsetWidth - elem.offsetWidth ) {
            ToolbarLeft = EditorId.offsetLeft + EditorId.offsetWidth - elem.offsetWidth
        } else {
            ToolbarLeft = rect.left + window.pageXOffset + rect.width / 2 - elem.offsetWidth / 2;
        }
        setToolbarLeft(rect.left + window.pageXOffset + rect.width / 2);
        elem.style.opacity = "1";
        elem.style.top = `${ToolbarTop}px`;
        elem.style.left = `${ToolbarLeft}px`;
    };

    // On Changes Editor Ballon Toolber Update
    useEffect(() => {
        toggleBallonToolbar();      
    })

    // On Change Editor Value
    const onChangeValue = (newValue: any) => {      
        setValue(`value ${JSON.stringify(newValue)}`);
        toggleBallonToolbar();
        if(!editor) return;
        const { selection } = editor;
        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          let chBefore = "";
          let target = {anchor: start, focus: start}

          if(start.offset === 1) {
            target = { anchor: {...start, offset: 0}, focus: start};
          } else if(start.offset > 1) {
            target = { anchor: {...start, offset: start.offset - 2}, focus: start};
          }

          chBefore = Editor.string(editor, target)

          if(chBefore === '@' || chBefore === ' @') {
            setTarget(target);
            setIndex(0);
            return;
          }

          if(chBefore === '/' || chBefore === ' /') {
            setDefaultToolbarTarget(target);
            return
          }

          setTarget(null);
          setDefaultToolbarTarget(null);
        }
        
    }

    // Mention Toolbar Keyboard Key Functionality
    const onKeyDown = useCallback(
      (event) => {
        if (target) {
          switch (event.key) {
            case "ArrowDown":
              event.preventDefault();
              const prevIndex = index >= CHARACTERS.length - 1 ? 0 : index + 1;
              console.log(prevIndex);
              setIndex(prevIndex);
              break;
            case "ArrowUp":
              event.preventDefault();
              const nextIndex = index <= 0 ? CHARACTERS.length - 1 : index - 1;
              console.log(nextIndex);
              setIndex(nextIndex);
              break;
            case "Tab":
            case "Enter":
              event.preventDefault();
              if(!editor) return;
              Transforms.select(editor, target);
              insertMention(editor, CHARACTERS[index]);
              setTarget(null);
              break;
            case "Escape":
              event.preventDefault();
              setTarget(null);
              break;
          }
        } else {
          switch (event.key) {
            case "Enter":
              
              if(!editor) return;
              const currentNode = getAbove(editor);
              console.log(currentNode);
              if(currentNode?.[0]?.children?.[0].text === "" && (currentNode?.[0]?.type === CUSTOM_ELEMENT_LIST_ITEM || currentNode?.[0]?.type === CUSTOM_ELEMENT_TODO_LIST )) {
                Transforms.unwrapNodes(editor, {
                  match: (n: any) => LIST_TYPES.includes(n.type),
                  split: true,
                });
                Transforms.setNodes(editor, {type: ELEMENT_DEFAULT, childre: [{text:""}]} as any);
                event.preventDefault();
              }
              if((currentNode?.[0]?.type === CUSTOM_ELEMENT_HINT || currentNode?.[0]?.type === ELEMENT_CODE_BLOCK || currentNode?.[0]?.type === ELEMENT_BLOCKQUOTE) && currentNode?.[0]?.children?.[currentNode?.[0]?.children?.length - 1].text.slice(-2) === `\n\n`) {
                editor.deleteBackward("character");
                editor.deleteBackward("character");
                event.preventDefault();
                const selectionPath = Editor.path(editor, editor.selection as Location);
                console.log(selectionPath);
                console.log(Path.next(selectionPath.slice(0, 1)));

                insertNodes<TElement>(
                  editor,
                  { type: ELEMENT_DEFAULT, children: [{ text: '' }] },
                  {
                    at: Path.next(selectionPath.slice(0, 1)),
                    select: true,
                  }
                );
              }
              console.log("Entered");
            break;
            case "Backspace":
              
              if(!editor) return;
              const getCurrentNode = getAbove(editor);
              console.log(getCurrentNode);          
              if(getCurrentNode?.[0]?.children?.[0].text === "" && (getCurrentNode?.[0]?.type === CUSTOM_ELEMENT_LIST_ITEM || getCurrentNode?.[0]?.type === CUSTOM_ELEMENT_TODO_LIST )) {
                Transforms.unwrapNodes(editor, {
                  match: (n: any) => LIST_TYPES.includes(n.type),
                  split: true,
                });
                Transforms.setNodes(editor, {type: ELEMENT_DEFAULT, childre: [{text:""}]} as any);
                event.preventDefault();
              }
              
            break;
          }
        }
      },
      [index, target]
    );
  
    // On Mention Item Click
    const mentionClick = (index: number) => {
      if(!editor) return;
      Transforms.select(editor, target);
      insertMention(editor, CHARACTERS[index]);
      setTarget(null);
    };
  

    // Mention Toolbar Toggler
    useEffect(() => {
      if (target && CHARACTERS.length > 0) {
        const el: any = mentionToolbarRef.current;
        if(!editor) return;
        const domRange = ReactEditor.toDOMRange(editor, target);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = "1";
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }, [CHARACTERS.length, editor, index, target]);


    // Slash Toolbar Toggler
    useEffect(() => {
      if (defaultToolbarTarget) {
        const EditorLeft:any = document.getElementById("editor-wrapper");
        const el: any = slashToolbarRef.current;
        if(!editor) return
        const domRange = ReactEditor.toDOMRange(editor, defaultToolbarTarget);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = "1";
        el.style.top = `${rect.top + + window.pageYOffset + rect.height + 5}px`;
        el.style.left = `${rect?.left}px`;
      }
    }, [editor, defaultToolbarTarget]);


    // Overwrite components with CreatePlateComponents
    const components = createPlateComponents({
        [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
          as: CustomParagraphElement,
        }),
        [ELEMENT_EXCALIDRAW]: ExcalidrawElement as any
      })
    const options = createPlateOptions();


    // editable's decorate props handler method
    const decorate = ([node, path]: [node: Node, path: Path]) => {
      
        if(Text.isText(node) && editor.selection == null && lastSelection !== null) {
          const intersection = Range.intersection(lastSelection, Editor.range(editor, path))

          if(intersection === null) {
            return []
          }

          return [{
            highlighted: true,
            ...intersection
          }]
        }

        if (editor.selection != null) {
          if (
            !Editor.isEditor(node) &&
            Editor.string(editor, [path[0]]) === "" &&
            Range.includes(editor.selection, path) &&
            Range.isCollapsed(editor.selection)
          ) {
            return [
              {
                ...editor.selection,
                placeholder: true,
              },
            ];
          }
        }
      
      return []
    }

    // Editable Props
    const editableProps:any = {
      spellCheck: false,
      autoFocus: true,
      onKeyDown: onKeyDown,
      decorate,
      renderLeaf: LeafRendere
    };

    return (
        <EditorWrapper id="editor">

            {/*============ Ballon Toolbar ===========*/}
            <TBallonToolbar ref={ballonToolberRef}>
                <BallonToolbar 
                  linkSet={setLinkFunc}
                  link={link}
                  isOpenLinkForm={isOpenLinkForm}
                  isOpenLinkFormSet={setIsOpenLinkFormFunc}
                  onLinkFormSubmit={onLinkFormSubmit}
                  lastSelection={editorSelection}
                />
            </TBallonToolbar>
            {/*============ End Ballon Toolbar ===========*/}

            {/*============ Slash (/) Toolbar ===========*/}
            {defaultToolbarTarget &&
              <SlashToolbarWrapper ref={slashToolbarRef}>
                <SlashToolbar removeSlashToolbar={setDefaultToolbarTargetFunc} />
              </SlashToolbarWrapper>
            }
            {/*============ End Slash (/) Toolbar ===========*/}

            {/*============ Mention (@) Toolbar ===========*/}
            {target && CHARACTERS.length > 0 && (
              <div className="mention_toolbar" ref={mentionToolbarRef}>
                <div className="mention_toolbar_content">
                  {CHARACTERS &&
                    CHARACTERS.map((item, ind) => {
                      return (
                        <MentionItem
                          name={item}
                          key={ind}
                          className={ind === index ? "active" : ""}
                          onMouseDown={mentionClick}
                          index={ind}
                        ></MentionItem>
                      );
                    })}
                </div>
              </div>
            )}
            {/*============ End Mention (@) Toolbar ===========*/}

            {/*============ Plate Editor ===========*/}
            <Plate editor={editor} enabled={true} editableProps={editableProps} plugins={plugins} components={components} options={options} onChange={onChangeValue} initialValue={initialValue} />
            {/*============ End Plate Editor ===========*/}

            <br/>
            <br/>
            {value}
        </EditorWrapper>
    );

}

export default EditorIndex;

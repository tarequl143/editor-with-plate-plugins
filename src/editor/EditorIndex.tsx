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
    useEventEditorId,
    useStoreEditorRef,
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
    SPEditor
} from '@udecode/plate';
import {initialValue} from "./InitialValue";
import {
    createExcalidrawPlugin,
    ELEMENT_EXCALIDRAW,
    ExcalidrawElement,
  } from '@udecode/plate-excalidraw';
import { Editor, Range, Location, BaseRange, Path, Text, createEditor, BaseEditor } from "slate";
import "./editor.css";
import { useCallback, useEffect, useRef, useState } from 'react';
import { EditorWrapper } from "./EditorIndex.style"
import { createImageOptionPlugin } from "./plugins/ImageOption/createImageOptionPlugin";
import BallonToolbar from "./toolbar/BallonToolbar";
import { TBallonToolbar, SlashToolbarWrapper } from './toolbar/ToolbarStyle';
import { DefaultLeaf, ReactEditor, RenderLeafProps } from 'slate-react';
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


// All Plguins
const plugins = [
    ...createBasicElementPlugins(),
    
    // editor
    createReactPlugin(),          // withReact
    createHistoryPlugin(),        // withHistory

    // elements
    createParagraphPlugin(),      // paragraph element
    createBlockquotePlugin(),     // blockquote element
    createCodeBlockPlugin(),      // code block element
    createExcalidrawPlugin(),
    createImagePlugin(),
    createImageOptionPlugin(),
    createKbdPlugin(),
    createNodeIdPlugin(),
    createLinkPlugin(),
   
    // marks
    createBoldPlugin(),           // bold mark
    createItalicPlugin(),         // italic mark
    createUnderlinePlugin(),      // underline mark
    createStrikethroughPlugin(),  // strikethrough mark
    createCodePlugin(),           // code mark
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

    const [value, setValue] = useState<string | null>(null);
    const editor = useMemo(() => createEditor(), []) as SPEditor & BaseEditor & ReactEditor;

    // @ and / Toolbar Necessary Things
    const slashToolbarRef:any = useRef();
    const mentionToolbarRef:any = useRef();
    const [target, setTarget] = useState<any>("");
    const [defaultToolbarTarget, setDefaultToolbarTarget] = useState<any>("");
    const [index, setIndex] = useState<number>(0);
    const [ballonToolbarWidth, setBallonToolbarWidth] = useState<number>(0);
    const [toolbarLeft, setToolbarLeft] = useState<number>(0);

    // Link Form Necessary Things
    const ref:any = useRef();

    useEffect(() => {
      const BallonToolbarWidth = ref.current.offsetWidth;
      setBallonToolbarWidth(BallonToolbarWidth)
    },[]);
    

    const [link, setLink] = useState<string>("");
    const [isOpenLinkForm, setIsOpenLinkForm] = useState<boolean>(false);
    const editorSelection = useRef(editor?.selection);
    const [lastSelection, setLastSelection] = useState<Range | null>(null);

    const setLinkFunc = (url: "") => {
      setLink(url);
    }

    const setIsOpenLinkFormFunc = (value:boolean) => {
      setIsOpenLinkForm(value);
      
      console.log(editor?.selection);
    }

    useEffect(() => {
      if(editor.selection !== null) {
        setLastSelection(editor.selection);
      }
    }, [editor.selection]);

    useEffect(() => {
      if (isOpenLinkForm) {
        editorSelection.current = editor?.selection;
        
        if(!editor) return;
        // Transforms.setSelection(editor, editorSelection.current as Partial<BaseRange>);
        Transforms.select(editor, editorSelection.current as Location);
        console.log(editor.selection);
        
        
      }
    }, [isOpenLinkForm]);

    const onLinkFormSubmit = (e: any) => {
      e.preventDefault();
    
      if(!editor) return;
      Transforms.select(editor, editorSelection.current as Location);

      console.log(editorSelection.current);
      
      //   editor.selection = editorSelection.current;
      
      if (link) {
        insertLink(editor, link);
        setIsOpenLinkFormFunc(false);
        console.log(link);
        
      }
    };

    const toggleBallonToolbar = () => {
        if(!editor) {
          return;
        }
        const elem: any = ref.current;
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

        // const rect = domSelection.getRangeAt(0).getBoundingClientRect();
        // elem.style.opacity = "1";
        // elem.style.top = `${
        //   rect.top + window.pageYOffset - elem.offsetHeight - 12
        // }px`;
        // elem.style.left = `${rect.left + window.pageXOffset + rect.width / 2}px`;
        // elem.style.transform = "translateX(-50%)";
        
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

    useEffect(() => {
        toggleBallonToolbar();      
        // setIsOpenLinkForm(false)
        // setLink("");
    })

    // 
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
          console.log(`chBefore`, chBefore, chBefore.length);

          if(chBefore === '@' || chBefore === ' @') {
            console.log('%c@', "color: red; font-size: 50px;");
            setTarget(target);
            setIndex(0);
            return;
          }

          if(chBefore === '/' || chBefore === ' /') {
            console.log('%c/', "color: red; font-size: 50px;");
            setDefaultToolbarTarget(target);
            return
          }

          setTarget(null);
          setDefaultToolbarTarget(null);
        }
        
    }

    // Mention Toolbar
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
        }
      },
      [index, target]
    );
  
    const mentionClick = (index: number) => {
      if(!editor) return;
      Transforms.select(editor, target);
      insertMention(editor, CHARACTERS[index]);
      setTarget(null);
    };
  
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
        console.log(rect);
        el.style.opacity = "1";
        el.style.top = `${rect.top + + window.pageYOffset + rect.height + 5}px`;
        el.style.left = `${rect?.left}px`;
      }
    }, [editor, defaultToolbarTarget]);


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

    const editableProps:any = {
      spellCheck: false,
      autoFocus: true,
      onKeyDown: onKeyDown,
      decorate,
      renderLeaf: LeafRendere
    };

    return (
        <EditorWrapper id="editor">
            <TBallonToolbar ref={ref}>
                <BallonToolbar 
                  linkSet={setLinkFunc}
                  link={link}
                  isOpenLinkForm={isOpenLinkForm}
                  isOpenLinkFormSet={setIsOpenLinkFormFunc}
                  onLinkFormSubmit={onLinkFormSubmit}
                  lastSelection={editorSelection}
                  width={ballonToolbarWidth}
                />
            </TBallonToolbar>
            {defaultToolbarTarget &&
              <SlashToolbarWrapper ref={slashToolbarRef}>
                <SlashToolbar />
              </SlashToolbarWrapper>
            }
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
            <Plate editor={editor} enabled={true} editableProps={editableProps} plugins={plugins} components={components}
                options={options} onChange={onChangeValue} initialValue={initialValue}
            >
                
            </Plate>
            <br/>
            <br/>
            {value}
        </EditorWrapper >
    );

}

export default EditorIndex;

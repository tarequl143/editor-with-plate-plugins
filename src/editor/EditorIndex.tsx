import {
    createBlockquotePlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createHeadingPlugin,
    createHistoryPlugin,
    createImagePlugin,
    createItalicPlugin,
    createParagraphPlugin,
    createPlateComponents,
    createPlateOptions,
    createReactPlugin,
    createSelectOnBackspacePlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
    Plate,
    useEventEditorId,
    useStoreEditorRef,
    isCollapsed,
    createSoftBreakPlugin,
    createExitBreakPlugin,
    createListPlugin,
    createTodoListPlugin,
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
    ELEMENT_H1,
    MARK_BOLD,
    createLinkPlugin
} from '@udecode/plate';
import {initialValue} from "./InitialValue";
import {
    createExcalidrawPlugin,
    ELEMENT_EXCALIDRAW,
    ExcalidrawElement,
  } from '@udecode/plate-excalidraw';
import { BaseRange, Editor, Range, Location, BaseSelection } from "slate";
import "./editor.css";
import { useEffect, useRef, useState } from 'react';
import { EditorWrapper, SlashToolbarWrapper } from "./EditorIndex.style"
import { createImageOptionPlugin } from "./plugins/ImageOption/createImageOptionPlugin";
import BallonToolbar from "./toolbar/BallonToolbar";
import HeaderToolbar from './toolbar/HeaderToolbar';
import { TBallonToolbar } from './toolbar/InlineToolbarStyle';
import { ReactEditor } from 'slate-react';
import { editableProps, optionsExitBreakPlugin, optionsResetBlockTypePlugin, optionsSoftBreakPlugin } from './config/PluginOptions';
import { optionsAutoformat } from './config/AutoFormatRules';
import { CustomParagraphElement } from './plugins/Paragraph/ParagraphElement';
import { insertLink } from './plugins/utils';
import { Transforms } from 'slate';
import SlashToolbar from './toolbar/SlashToolbar';


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
    const editor = useStoreEditorRef(useEventEditorId('focus'));

    // @ and / Toolbar Necessary Things
    const slashToolbarRef:any = useRef();
    const [target, setTarget] = useState<any>("");
    const [defaultToolbarTarget, setDefaultToolbarTarget] = useState<any>("");
    const [index, setIndex] = useState<number>(0);

    // Link Form Necessary Things
    const ref:any = useRef();

    const [link, setLink] = useState<string>("");
    const [isOpenLinkForm, setIsOpenLinkForm] = useState<boolean>(false);
    const editorSelection = useRef(editor?.selection);

    const setLinkFunc = (url: "") => {
      setLink(url);
    }

    const setIsOpenLinkFormFunc = (value:boolean) => {
      setIsOpenLinkForm(value);
      
      console.log(editor?.selection);
    }

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
    
        if (
          !selection ||
          !ReactEditor.isFocused(editor) ||
          Range.isCollapsed(selection) ||
          Editor.string(editor, selection) === ""
        ) {
          if (isOpenLinkForm) {
            return;
          }
          elem.removeAttribute("style");
          return;
        }
    
        setIsOpenLinkForm(false);
        setLink("");

        const EditorId:any = document.getElementById("editor");
    
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
        
        elem.style.opacity = "1";
        elem.style.top = `${ToolbarTop}px`;
        elem.style.left = `${ToolbarLeft}px`;
        // elem.style.transform = "translateX(-50%)";
    };

    useEffect(() => {
        toggleBallonToolbar();
        // setIsOpenLinkForm(false)
        // setLink("");
    })

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

    return (
        <EditorWrapper id="editor">
            <HeaderToolbar />
            <TBallonToolbar ref={ref}>
                <BallonToolbar 
                  linkSet={setLinkFunc}
                  link={link}
                  isOpenLinkForm={isOpenLinkForm}
                  isOpenLinkFormSet={setIsOpenLinkFormFunc}
                  onLinkFormSubmit={onLinkFormSubmit}
                />
            </TBallonToolbar>
            {defaultToolbarTarget &&
              <SlashToolbarWrapper ref={slashToolbarRef}>
                <SlashToolbar />
              </SlashToolbarWrapper>
            }
            <Plate editableProps={editableProps} plugins={plugins} components={components}
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

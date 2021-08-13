import { getPlatePluginType, HeadingToolbar, ToolbarElement, useEventEditorId, useStoreEditorRef } from "@udecode/plate";
import { CUSTOM_ELEMENT_IMAGE_OPTION } from "../plugins/ImageOption/types";
import ToolbarImageOption from "./toolbarButtons/ToolbarImageOption";

const HeaderToolbar = () => {
    
    const editor = useStoreEditorRef(useEventEditorId('focus'));


    return (
        <HeadingToolbar>
            <ToolbarImageOption icon={"Option"} />
        </HeadingToolbar>
    )
};

export default HeaderToolbar;
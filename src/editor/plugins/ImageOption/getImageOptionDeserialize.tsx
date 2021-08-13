import { Deserialize, getElementDeserializer, getPlatePluginOptions } from "@udecode/plate";
import {CUSTOM_ELEMENT_IMAGE_OPTION} from "./types";

export const getImageOptionDeserialize = (): Deserialize => (editor) => {
    const options = getPlatePluginOptions(editor, CUSTOM_ELEMENT_IMAGE_OPTION);
  
    return {
      element: getElementDeserializer({
        type: options.type,
        rules: [{ nodeNames: 'IMGOPTION' }],
        ...options.deserialize,
      }),
    };
  };
  
import { getElementDeserializer } from '@udecode/plate';
import { Deserialize, getPlatePluginOptions } from '@udecode/plate-core';
import { CUSTOM_ELEMENT_LINK } from './types';

export const getLinkDeserialize = (): Deserialize => (editor) => {
    const options = getPlatePluginOptions(editor, CUSTOM_ELEMENT_LINK);

    return {
        element: getElementDeserializer({
            type: options.type,
            rules: [{ nodeNames: 'A' }],
            ...options.deserialize,
        }),
    };
};
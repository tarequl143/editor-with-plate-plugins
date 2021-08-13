import { getElementDeserializer } from '@udecode/plate';
import { Deserialize, getPlatePluginOptions } from '@udecode/plate-core';
import { CUSTOM_ELEMENT_ORDERED_LIST } from './types';

export const getOrderedListDeserialize = (): Deserialize => (editor) => {
    const options = getPlatePluginOptions(editor, CUSTOM_ELEMENT_ORDERED_LIST);

    return {
        element: getElementDeserializer({
            type: options.type,
            rules: [{ nodeNames: 'ol' }],
            ...options.deserialize,
        }),
    };
};
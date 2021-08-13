import { getElementDeserializer } from '@udecode/plate';
import { Deserialize, getPlatePluginOptions } from '@udecode/plate-core';
import { CUSTOM_ELEMENT_LIST_ITEM } from './types';

export const getListItemDeserialize = (): Deserialize => (editor) => {
    const options = getPlatePluginOptions(editor, CUSTOM_ELEMENT_LIST_ITEM);

    return {
        element: getElementDeserializer({
            type: options.type,
            rules: [{ nodeNames: 'li' }],
            ...options.deserialize,
        }),
    };
};
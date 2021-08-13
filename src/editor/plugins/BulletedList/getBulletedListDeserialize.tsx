import { getElementDeserializer } from '@udecode/plate';
import { Deserialize, getPlatePluginOptions } from '@udecode/plate-core';
import { CUSTOM_ELEMENT_BULLETED_LIST } from './types';

export const getBulletedListDeserialize = (): Deserialize => (editor) => {
    const options = getPlatePluginOptions(editor, CUSTOM_ELEMENT_BULLETED_LIST);

    return {
        element: getElementDeserializer({
            type: options.type,
            rules: [{ nodeNames: 'ul' }],
            ...options.deserialize,
        }),
    };
};
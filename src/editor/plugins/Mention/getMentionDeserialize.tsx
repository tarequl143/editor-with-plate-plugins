import { getElementDeserializer } from '@udecode/plate';
import { Deserialize, getPlatePluginOptions } from '@udecode/plate-core';
import { CUSTOM_ELEMENT_MENTION_ITEM } from './types';

export const getMentionDeserialize = (): Deserialize => (editor) => {
    const options = getPlatePluginOptions(editor, CUSTOM_ELEMENT_MENTION_ITEM);

    return {
        element: getElementDeserializer({
            type: options.type,
            rules: [{ nodeNames: 'mention' }],
            ...options.deserialize,
        }),
    };
};
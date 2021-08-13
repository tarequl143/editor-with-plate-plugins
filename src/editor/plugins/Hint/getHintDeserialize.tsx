import { getElementDeserializer } from '@udecode/plate';
import { Deserialize, getPlatePluginOptions } from '@udecode/plate-core';
import { CUSTOM_ELEMENT_HINT } from './types';

export const getHintDeserialize = (): Deserialize => (editor) => {
    const options = getPlatePluginOptions(editor, CUSTOM_ELEMENT_HINT);

    return {
        element: getElementDeserializer({
            type: options.type,
            rules: [{ nodeNames: 'hint' }],
            ...options.deserialize,
        }),
    };
};
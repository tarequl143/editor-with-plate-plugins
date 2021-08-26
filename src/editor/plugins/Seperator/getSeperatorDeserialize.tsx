import { getElementDeserializer } from '@udecode/plate';
import { Deserialize, getPlatePluginOptions } from '@udecode/plate-core';
import { CUSTOM_ELEMENT_SEPERATOR } from './types';

export const getSeperatorDeserialize = (): Deserialize => (editor) => {
    const options = getPlatePluginOptions(editor, CUSTOM_ELEMENT_SEPERATOR);

    return {
        element: getElementDeserializer({
            type: options.type,
            rules: [{ nodeNames: 'HR' }],
            ...options.deserialize,
        }),
    };
};
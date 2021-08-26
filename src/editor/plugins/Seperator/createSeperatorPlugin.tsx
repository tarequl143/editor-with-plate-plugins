import {
    getPlatePluginTypes,
    getRenderElement,
    PlatePlugin,
} from '@udecode/plate-core';

import { getSeperatorDeserialize } from './getSeperatorDeserialize';
import { CUSTOM_ELEMENT_SEPERATOR } from './types';
import { getToggleElementOnKeyDown } from '@udecode/plate';
import { getCustomElementRenderer } from '../renderers/getCustomElementRenderer';

/**
 * Enables support for images.
 */
export const createSeperatorPlugin = (): PlatePlugin => ({
    pluginKeys: CUSTOM_ELEMENT_SEPERATOR,
    renderElement: getCustomElementRenderer(CUSTOM_ELEMENT_SEPERATOR),
    deserialize: getSeperatorDeserialize(),
    onKeyDown: getToggleElementOnKeyDown(CUSTOM_ELEMENT_SEPERATOR),
});
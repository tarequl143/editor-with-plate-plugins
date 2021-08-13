import {
    getPlatePluginTypes,
    getRenderElement,
    PlatePlugin,
} from '@udecode/plate-core';

import { getHintDeserialize } from './getHintDeserialize';
import { CUSTOM_ELEMENT_HINT } from './types';
import { getToggleElementOnKeyDown } from '@udecode/plate';
import { getCustomElementRenderer } from '../renderers/getCustomElementRenderer';

/**
 * Enables support for images.
 */
export const createHintPlugin = (): PlatePlugin => ({
    pluginKeys: CUSTOM_ELEMENT_HINT,
    renderElement: getCustomElementRenderer(CUSTOM_ELEMENT_HINT),
    deserialize: getHintDeserialize(),
    onKeyDown: getToggleElementOnKeyDown(CUSTOM_ELEMENT_HINT),
});
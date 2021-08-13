import {
    getPlatePluginTypes,
    getRenderElement,
    PlatePlugin,
} from '@udecode/plate-core';

import { getOrderedListDeserialize } from './getOrderedListDeserialize';
import { CUSTOM_ELEMENT_ORDERED_LIST } from './types';
import { getToggleElementOnKeyDown } from '@udecode/plate';
import { getCustomElementRenderer } from '../renderers/getCustomElementRenderer';

/**
 * Enables support for images.
 */
export const createOrderedListPlugin = (): PlatePlugin => ({
    pluginKeys: CUSTOM_ELEMENT_ORDERED_LIST,
    renderElement: getCustomElementRenderer(CUSTOM_ELEMENT_ORDERED_LIST),
    deserialize: getOrderedListDeserialize(),
    onKeyDown: getToggleElementOnKeyDown(CUSTOM_ELEMENT_ORDERED_LIST),
});
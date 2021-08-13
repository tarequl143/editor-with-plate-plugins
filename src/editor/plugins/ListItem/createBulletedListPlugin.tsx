import {
    getPlatePluginTypes,
    getRenderElement,
    PlatePlugin,
} from '@udecode/plate-core';

import { getListItemDeserialize } from './getListItemDeserialize';
import { CUSTOM_ELEMENT_LIST_ITEM } from './types';
import { getToggleElementOnKeyDown } from '@udecode/plate';
import { getCustomElementRenderer } from '../renderers/getCustomElementRenderer';

/**
 * Enables support for images.
 */
export const createListItemPlugin = (): PlatePlugin => ({
    pluginKeys: CUSTOM_ELEMENT_LIST_ITEM,
    renderElement: getCustomElementRenderer(CUSTOM_ELEMENT_LIST_ITEM),
    deserialize: getListItemDeserialize(),
    onKeyDown: getToggleElementOnKeyDown(CUSTOM_ELEMENT_LIST_ITEM),
});
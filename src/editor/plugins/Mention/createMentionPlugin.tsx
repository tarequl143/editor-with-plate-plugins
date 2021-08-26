import {
    getPlatePluginTypes,
    getRenderElement,
    PlatePlugin,
} from '@udecode/plate-core';

import { getMentionDeserialize } from './getMentionDeserialize';
import { CUSTOM_ELEMENT_MENTION_ITEM } from './types';
import { getToggleElementOnKeyDown } from '@udecode/plate';
import { getCustomElementRenderer } from '../renderers/getCustomElementRenderer';

/**
 * Enables support for images.
 */
export const createMentionPlugin = (): PlatePlugin => ({
    pluginKeys: CUSTOM_ELEMENT_MENTION_ITEM,
    renderElement: getCustomElementRenderer(CUSTOM_ELEMENT_MENTION_ITEM),
    deserialize: getMentionDeserialize(),
    onKeyDown: getToggleElementOnKeyDown(CUSTOM_ELEMENT_MENTION_ITEM),
});
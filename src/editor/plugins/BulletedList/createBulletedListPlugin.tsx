import {
    getPlatePluginTypes,
    getRenderElement,
    PlatePlugin,
} from '@udecode/plate-core';

import { getBulletedListDeserialize } from './getBulletedListDeserialize';
import { CUSTOM_ELEMENT_BULLETED_LIST } from './types';
import { getToggleElementOnKeyDown } from '@udecode/plate';
import { getCustomElementRenderer } from '../renderers/getCustomElementRenderer';

/**
 * Enables support for images.
 */
export const createBulletedListPlugin = (): PlatePlugin => ({
    pluginKeys: CUSTOM_ELEMENT_BULLETED_LIST,
    renderElement: getCustomElementRenderer(CUSTOM_ELEMENT_BULLETED_LIST),
    deserialize: getBulletedListDeserialize(),
    onKeyDown: getToggleElementOnKeyDown(CUSTOM_ELEMENT_BULLETED_LIST)
});
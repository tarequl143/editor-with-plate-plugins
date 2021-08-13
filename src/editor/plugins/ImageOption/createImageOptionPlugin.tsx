import {
    PlatePlugin,
} from '@udecode/plate-core';

import { getImageOptionDeserialize } from './getImageOptionDeserialize';
import { CUSTOM_ELEMENT_IMAGE_OPTION } from './types';
import { getToggleElementOnKeyDown } from '@udecode/plate';
import { getCustomElementRenderer } from '../renderers/getCustomElementRenderer';
import { withImageOption } from './withImageOption';

/**
 * Enables support for images.
 */
export const createImageOptionPlugin = (): PlatePlugin => ({
    pluginKeys: CUSTOM_ELEMENT_IMAGE_OPTION,
    renderElement: getCustomElementRenderer(CUSTOM_ELEMENT_IMAGE_OPTION),
    deserialize: getImageOptionDeserialize(),
    onKeyDown: getToggleElementOnKeyDown(CUSTOM_ELEMENT_IMAGE_OPTION),
    withOverrides: withImageOption()
});
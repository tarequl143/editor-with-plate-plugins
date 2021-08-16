import {
    getPlatePluginTypes,
    getRenderElement,
    PlatePlugin,
} from '@udecode/plate-core';

import { getLinkDeserialize } from './getLinkDeserialize';
import { CUSTOM_ELEMENT_LINK } from './types';
import { getToggleElementOnKeyDown } from '@udecode/plate';
import { getCustomElementRenderer } from '../renderers/getCustomElementRenderer';
import { withLink } from './withLink';

/**
 * Enables support for images.
 */
export const createLinkPlugin = (): PlatePlugin => ({
    pluginKeys: CUSTOM_ELEMENT_LINK,
    renderElement: getCustomElementRenderer(CUSTOM_ELEMENT_LINK),
    deserialize: getLinkDeserialize(),
    onKeyDown: getToggleElementOnKeyDown(CUSTOM_ELEMENT_LINK),
    withOverrides: withLink()
});
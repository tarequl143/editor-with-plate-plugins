import { getToggleElementOnKeyDown } from '@udecode/plate-common';
import { getRenderElement, PlatePlugin } from '@udecode/plate-core';
import { CUSTOM_ELEMENT_TODO_LIST } from './types';
import { getTodoListDeserialize } from './getTodoListDeserialize';

export const createTodoListPlugin = (): PlatePlugin => ({
  pluginKeys: CUSTOM_ELEMENT_TODO_LIST,
  renderElement: getRenderElement(CUSTOM_ELEMENT_TODO_LIST),
  deserialize: getTodoListDeserialize(),
  onKeyDown: getToggleElementOnKeyDown(CUSTOM_ELEMENT_TODO_LIST),
});

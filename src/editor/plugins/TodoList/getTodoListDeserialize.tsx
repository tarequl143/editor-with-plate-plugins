import { getElementDeserializer } from '@udecode/plate-common';
import {
  Deserialize,
  getPlatePluginOptions,
} from '@udecode/plate-core';
import { CUSTOM_ELEMENT_TODO_LIST } from './types';

export const getTodoListDeserialize = (): Deserialize => (editor) => {
  const options = getPlatePluginOptions(editor, CUSTOM_ELEMENT_TODO_LIST);

  return {
    element: getElementDeserializer({
        type: options.type,
        rules: [{ nodeNames: 'todo_list' }],
        ...options.deserialize,
    }),
  };
};
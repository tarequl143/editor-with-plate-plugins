import {
    createPlateOptions,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_CODE_BLOCK,
    ELEMENT_PARAGRAPH,
    ELEMENT_TD,
    ELEMENT_TODO_LI,
    ExitBreakPluginOptions,
    isBlockAboveEmpty,
    isSelectionAtBlockStart,
    KEYS_HEADING,
    MARK_ITALIC,
    MentionNodeData,
    ResetBlockTypePluginOptions,
    SoftBreakPluginOptions,
  } from '@udecode/plate';
import { CUSTOM_ELEMENT_BULLETED_LIST } from '../plugins/BulletedList/types';
import { CUSTOM_ELEMENT_HINT } from '../plugins/Hint/types';
import { CUSTOM_ELEMENT_LIST_ITEM } from '../plugins/ListItem/types';
import { CUSTOM_ELEMENT_ORDERED_LIST } from '../plugins/OrderedList/types';
import { CUSTOM_ELEMENT_TODO_LIST } from '../plugins/TodoList/types';

  
  export const options = createPlateOptions();
  
  export const optionsMentionPlugin = {
    maxSuggestions: 10,
    insertSpaceAfterMention: false,
    trigger: '@',
    mentionableFilter: (s: string) => (mentionable: MentionNodeData) =>
      mentionable.email.toLowerCase().includes(s.toLowerCase()) ||
      mentionable.name.toLowerCase().includes(s.toLowerCase()),
    mentionableSearchPattern: '\\S*',
  };
  
  const resetBlockTypesCommonRule = {
    types: [],
    defaultType: ELEMENT_PARAGRAPH,
  };
  
  export const optionsResetBlockTypePlugin: ResetBlockTypePluginOptions = {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Enter',
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Backspace',
        predicate: isSelectionAtBlockStart,
      },
    ],
  };
  
  export const optionsSoftBreakPlugin: SoftBreakPluginOptions = {
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD, CUSTOM_ELEMENT_HINT],
        },
      },
    ],
  };
  
  export const optionsExitBreakPlugin: ExitBreakPluginOptions = {
    rules: [
      {
        hotkey: 'ctrl+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING,
        },
      },
    ],
  };
  
  // export const editableProps = {
  //   // placeholder: 'Enter some rich text…',
  //   spellCheck: false,
  //   autoFocus: true,
  // };
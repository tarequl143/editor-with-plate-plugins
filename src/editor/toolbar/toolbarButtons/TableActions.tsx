import { ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TR, getAbove, getEmptyCellNode, getEmptyRowNode, getEmptyTableNode, getPlatePluginType, insertNodes, someNode, SPEditor, TablePluginOptions, TElement } from "@udecode/plate";
import { Path } from "slate";


// Table Insert
export const insertTable = (
    editor: SPEditor,
    { header }: TablePluginOptions
  ) => {
    if (
      !someNode(editor, {
        match: { type: getPlatePluginType(editor, ELEMENT_TABLE) },
      })
    ) {
      const currentNode = getAbove(editor);
      const currentNodePath = currentNode?.[1]?.[0];
      const insertAt = [currentNodePath as number + 1];  
      editor?.deleteBackward("character");
      insertNodes<TElement>(editor, getEmptyTableNode(editor, { header }), {at: insertAt});
    }
};


// Add Row Before
export const addRowBefore = (editor: SPEditor, { header }: TablePluginOptions) => {
  if (
    someNode(editor, {
      match: { type: getPlatePluginType(editor, ELEMENT_TABLE) },
    })
  ) {
    const currentRowItem = getAbove(editor, {
        match: { type: getPlatePluginType(editor, ELEMENT_TR) },
      });
    
    if (currentRowItem) {
      const [currentRowElem, currentRowPath] = currentRowItem;

      insertNodes<TElement>(
        editor,
        getEmptyRowNode(editor, {
          header,
          colCount: currentRowElem.children.length,
        }),
        {
          at: currentRowPath,
        }
      );
    }
  }
};


// Add Row After
export const addRowAfter = (editor: SPEditor, { header }: TablePluginOptions) => {
  if (
    someNode(editor, {
      match: { type: getPlatePluginType(editor, ELEMENT_TABLE) },
    })
  ) {
    const currentRowItem = getAbove(editor, {
        match: { type: getPlatePluginType(editor, ELEMENT_TR) },
      });
    console.log(currentRowItem);
    
    if (currentRowItem) {
      const [currentRowElem, currentRowPath] = currentRowItem;

      insertNodes<TElement>(
        editor,
        getEmptyRowNode(editor, {
          header,
          colCount: currentRowElem.children.length,
        }),
        {
          at: Path.next(currentRowPath),
        }
      );
    }
  }
};

// Add Column Left
export const addColumnLeft = (editor: SPEditor, { header }: TablePluginOptions) => {
    if (
      someNode(editor, {
        match: { type: getPlatePluginType(editor, ELEMENT_TABLE) },
      })
    ) {
      const currentCellItem = getAbove(editor, {
        match: {
          type: [
            getPlatePluginType(editor, ELEMENT_TD),
            getPlatePluginType(editor, ELEMENT_TD),
          ],
        },
      });
  
      const currentTableItem = getAbove(editor, {
        match: { type: getPlatePluginType(editor, ELEMENT_TABLE) },
      });
  
      if (currentCellItem && currentTableItem) {
        const nextCellPath = Path.next(currentCellItem[1]);
        const newCellPath = nextCellPath.slice();
        const replacePathPos = newCellPath.length - 2;
        const currentRowIdx = nextCellPath[replacePathPos];
  
        currentTableItem[0].children.forEach((row, rowIdx) => {
            currentCellItem[1][replacePathPos] = rowIdx;
  
          insertNodes<TElement>(editor, getEmptyCellNode(editor, { header }), {
            at: currentCellItem[1],
          });
        });
      }
    }
  };


  // Add Column Right
  export const addColumnRight = (editor: SPEditor, { header }: TablePluginOptions) => {
    if (
      someNode(editor, {
        match: { type: getPlatePluginType(editor, ELEMENT_TABLE) },
      })
    ) {
      const currentCellItem = getAbove(editor, {
        match: {
          type: [
            getPlatePluginType(editor, ELEMENT_TD),
            getPlatePluginType(editor, ELEMENT_TD),
          ],
        },
      });
  
      const currentTableItem = getAbove(editor, {
        match: { type: getPlatePluginType(editor, ELEMENT_TABLE) },
      });
  
      if (currentCellItem && currentTableItem) {
        const nextCellPath = Path.next(currentCellItem[1]);
        const newCellPath = nextCellPath.slice();
        const replacePathPos = newCellPath.length - 2;
        const currentRowIdx = nextCellPath[replacePathPos];
  
        currentTableItem[0].children.forEach((row, rowIdx) => {
          newCellPath[replacePathPos] = rowIdx;
  
          insertNodes<TElement>(editor, getEmptyCellNode(editor, { header }), {
            at: newCellPath,
          });
        });
      }
    }
  };
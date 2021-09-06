import { deleteColumn, deleteRow, deleteTable, ToolbarTable } from "@udecode/plate";
import { AiOutlineInsertRowAbove, AiOutlineInsertRowBelow, AiOutlineDelete, AiOutlineInsertRowRight, AiOutlineDeleteColumn, AiOutlineInsertRowLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDeleteRow } from "react-icons/ai";
import { VscRemove } from "react-icons/vsc";
import { useFocused, useSelected } from "slate-react";
import { addColumnLeft, addColumnRight, addRowAfter, addRowBefore } from "../../toolbar/toolbarButtons/TableActions";
import { StyledTooltip, TableActionWrapper, TableElem, TableElementWrapper, TableTbody, TableWrapper } from "./TableStyle";


const TableElement = (props: any) => {
    const { attributes, children } = props;
    const focused = useFocused();
    const selected = useSelected();

    const tooltip:any = {
        arrow: true,
        delay: 0,
        duration: [200, 0],
        hideOnClick: false,
        offset: [0, 17],
        placement: 'top',
        class: "asiasiais"
      };
    
    return (
        <TableElementWrapper {...attributes}>
            {focused && selected &&
                <TableActionWrapper>
                    <ToolbarTable tooltip={{ content: <StyledTooltip>Add Row Above</StyledTooltip>, ...tooltip }} icon={<AiOutlineInsertRowAbove />} transform={addRowBefore} />
                    <ToolbarTable tooltip={{ content: <StyledTooltip>Add Row Below</StyledTooltip>, ...tooltip }} icon={<AiOutlineInsertRowBelow />} transform={addRowAfter} />
                    <ToolbarTable tooltip={{ content: <StyledTooltip>Delete Row</StyledTooltip>, ...tooltip }} icon={<AiOutlineDeleteRow />} transform={deleteRow} />
                    <ToolbarTable tooltip={{ content: <StyledTooltip>Add Column Left Side</StyledTooltip>, ...tooltip }} icon={<AiOutlineInsertRowLeft />} transform={addColumnLeft} />
                    <ToolbarTable tooltip={{ content: <StyledTooltip>Add Column Right Side</StyledTooltip>, ...tooltip }} icon={<AiOutlineInsertRowRight />} transform={addColumnRight} />
                    <ToolbarTable tooltip={{ content: <StyledTooltip>Delete Column</StyledTooltip>, ...tooltip }} icon={<AiOutlineDeleteColumn />} transform={deleteColumn} />
                    <ToolbarTable tooltip={{ content: <StyledTooltip>Delete Table</StyledTooltip>, ...tooltip }} icon={<AiOutlineDelete />} transform={deleteTable} />
                </TableActionWrapper>
            }
            <TableWrapper>
                <TableElem>
                    <TableTbody>
                        {children}
                    </TableTbody>
                </TableElem>
            </TableWrapper>
        </TableElementWrapper>
    );
};

export default TableElement;

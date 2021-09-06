import styled from "styled-components";

export const TableElementWrapper = styled.div`
    position: relative;
    background-color: transparent;
    width: 100%;
    padding: 20px 0;
    z-index: 9;
    .placeholder {
        display: none;
    }
`
export const TableActionWrapper = styled.div`
    position: absolute;
    right: 0;
    top: -22px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    display: flex;
    span {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        border-right: 1px solid #d4d4d4;
        width: 32px;
        height: 32px;
        color: #cccccc;
        svg {
            width: 22px;
            height: 22px;
        }
        &:hover {
            color: #ffffff;
            background-color: #1668e3;
        }
        &:last-child {
            border-right: none;
        }
    }
`
export const TableWrapper = styled.div`
    width: 100%;
`

export const TableElem = styled.table`
    position: relative;
    width: 100%;
    border-collapse: collapse;
    .placeholder {
        width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

export const TableTbody = styled.tbody``
export const TrElem = styled.tr``
export const TdElem = styled.td`
    border: 1px solid #d4d4d4;
    min-width: 100px;
`

export const TdInnerWrap = styled.div`
    width: 100%;
    padding: 8px 12px;
    line-height: 24px;
    box-sizing: border-box;
    p {
        line-height: 24px;
    }
`

export const StyledTooltip = styled.div`
    background-color: #000000;
    padding: 5px 10px;
    color: #f4f4f4;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        font-size: 14px;
    }
`

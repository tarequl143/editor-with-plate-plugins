import styled from "styled-components";

export const TBallonToolbar = styled.div`
    position: absolute;
    left: -2000px;
    top: -2000px;
    z-index: 99999;
    opacity: 0;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px #d4d4d4;
    border-radius: 2px;
    transition: opacity 0.75s ease 0s;
    box-sizing: border-box;
    width: max-content;
`

export const TBallonToolbarContent = styled.div`
    line-height: 1;
    padding: 0;
    margin: 0;
    vertical-align: middle;
    padding: 4px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    z-index: 9;
    > span {
        width: 32px;
        height: 32px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 4px;
        box-sizing: border-box;
        color: #6a707c;
        svg {
            width: 100%;
        }
    }
    .slate-ToolbarButton-active {
        color: #98e17d;
    }
`
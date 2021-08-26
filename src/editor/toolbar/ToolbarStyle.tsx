import styled from "styled-components";

export const TBallonToolbar = styled.div`
    position: absolute;
    left: -2000px;
    top: -2000px;
    z-index: 99999;
    opacity: 0;
    background-color: #ffffff;
    box-shadow: 0px 10px 30px rgba(56, 63, 69, 0.14);
    border: 1px solid rgba(56, 63, 69, 0.1);
    border-radius: 4px;
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
        .icon {
            color: #98e17d;
        }
    }
`

export const SlashToolbarWrapper = styled.div`
    display: flex;
    background-color: #ffffff;
    min-height: 30px;
    min-width: 200px;
    position: absolute;
    z-index: 9999;
    width: 200px;
    height: 280px;
    overflow-y: auto;
    box-shadow: 0px 10px 30px rgba(56, 63, 69, 0.06);
    border: 1px solid rgba(56, 63, 69, 0.1);
    border-radius: 5px;
    > div {
        width: 100%;
        background-color: #ffffff;
        padding: 8px;
        box-shadow: 0 0 5px #d4d4d4;
        height: 100%;
        overflow-y: auto;
        > div {
            position: relative;
            width: 100%;
            padding: 8px 8px 8px 44px;
            justify-content: flex-start;
            box-sizing: border-box;
            height: 44px;
            &:hover {
                background-color: #ffffff;
                box-shadow: 0 0 2px #cccccc;
                border-radius: 4px;
            }
            .icon {
                position: absolute;
                left: 8px;
                top: 11px;
                width: 28px;
                height: 22px;
                background-color: rgba(51, 51, 51, 0.06);
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: #222C3C;
            }
        }
    }
`
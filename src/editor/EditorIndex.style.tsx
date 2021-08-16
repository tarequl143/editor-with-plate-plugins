import styled from "styled-components"

export const EditorWrapper = styled.div`
    display: flex;
    padding: 20px;
    border: 1px solid #dddddd;
    width: 900px;
    max-width: 100%;
    margin: 0 auto;
    flex-direction: column;
`

export const Blockquote = styled.blockquote`
    display: flex;
    padding: 5px 10px;
    border-left: 5px solid red;
    margin: 0;
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
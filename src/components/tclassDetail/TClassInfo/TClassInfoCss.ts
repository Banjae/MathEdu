import styled from "styled-components";
import { TfontCol } from "../../../utils/Color";

export const TClassInfoCss = styled.div`
    background-color: #fff;
    padding: 30px;
    padding-right: 15px;
    border-radius: 15px;
    .header {
        display: flex;
        justify-content: space-between;
        > span {
            color: ${TfontCol};
            font-size: 20px;
            font-weight: 500;
        }
    }
    .wrap {
        width: 500px;
        padding: 0 30px;
        @media screen and (max-width: 500px) {
            width: 450px;
        }
        > ul {
            
            li {
                
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #F5F5F5;
                &:last-child {
                    padding: 0;
                }
                .left {
                    display: flex;
                    flex-direction: column;
                    text-align: justify;
                    width: 150px;
                    > span {
                        position: relative;
                        em {
                            color: ${TfontCol};
                            white-space: nowrap;
                            font-style: normal;
                            font-size: 15px;
                        }
                    }
                    > span::after {
                        content: "";
                        display: inline-block;
                        width: 100%;
                        height: 0px;
                    }
                    > span::before {
                        content: "";
                        display: inline-block;
                        width: 100%;
                        height: 0px;
                    }
                }
                .right {
                    text-align: center;
                    overflow: hidden;
                    width: 50%;
                    letter-spacing: 0.5px;
                    font-size: 16px;
                    letter-spacing: 1px;
                    .wave {
                        margin: 0 10px;
                    }
                    span {
                        font-size: 15px;
                    }
                }
            }
        }
    }
`;

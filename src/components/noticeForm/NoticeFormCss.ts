import { TfontCol, TmainCol } from "./../../utils/Color";
import styled from "styled-components";
import { Button } from "../../utils/Layout";

const NoticeFormCss = styled.div`
    .sectionTop {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        p {
            color: ${TfontCol};
            font-size: 18px;
        }
        .search {
            form {
                display: flex;
                .searchBox {
                    border: 2px solid #d9d9d9;
                    height: 30px;
                    border-radius: 5px;
                }
                .searchBt {
                    ${Button}
                    background: ${TmainCol};
                    margin-left: 15px;
                }
            }
        }
    }
    .sectionMain {
        margin-bottom: 10px;
        .table {
            border-radius: 5px;
            width: 100%;
            text-align: center;
            .tableHeader {
                background: ${TmainCol};
                color: #fff;
                border: none;
                height: 50px;
            }
            .tableMain {
                height: 40px;
            }
        }
    }
`;

export default NoticeFormCss;
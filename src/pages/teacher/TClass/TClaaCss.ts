import styled from "styled-components";
import { TfontCol } from "../../../utils/Color";
import { mainContainer } from "../../../utils/Layout";

const TClassCss = styled.div`
    ${mainContainer}
    .title {
        color: ${TfontCol};
        font-size: 25px;
    }
`;

export default TClassCss;

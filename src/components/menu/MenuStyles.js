import styled from 'styled-components';
import { Btn } from '../../AppStyles';

export const MenuBtn = styled(Btn)`
    display: block;
    width: 280px;
    margin: 25px auto;
    &:disabled {
        color: #3900408c;
        border-color: #3900408c;
        background-color: #ffffff;
    }
`

export const Centered = styled.div`
    width: 300px;
    margin: 100px auto;
`
export const StyledH2 = styled.h2`
    font-weight: bold;
    font-size: 1.2rem;
`;
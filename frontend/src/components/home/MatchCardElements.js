import styled from "styled-components";

export const MatchCard = styled.div`
    background-color: var(--hover-alt-color);
    border-radius: 10px;
    height: 100%;
`;

export const MatchCardHeader = styled.div`
    background-color: #382591;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TokenType = styled.div`
    background-color: var(--hover-color);
    padding: 10px 15px;
    border-radius: 25px;

    span {
        color: white;
        font-weight: 600;
    }
`;

export const NumberCardContainer = styled.div`
    display: flex;
    margin: 0 -5px;
`;

export const NumberCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    div {
        background-color: var(--hover-color);
        border-radius: 10px;
        padding: 10px;
        span {
            color: white;
            font-weight: 700;
            font-size: 16px;
            line-height: 1;
        }
    }
    & > span {
        color: white;
        font-size: 10px;
        line-height: 1;
        margin-top: 5px;
    }
`;

export const MatchCardBody = styled.div`
    padding: 20px;
`;

export const MatchCardBodyHeader = styled.div`
    width: 100%;
    background-color: #cab4ff;
    text-align: center;
    border-radius: 5px;
    span {
        font-size: 32px;
        font-weight: 800;
        color: #382591;
        line-height: 1.5;
        @media screen and (max-width: 576px) {
            font-size: 24px;
        }
    }
`;

export const MatchCardClaimButton = styled.button`
    width: 100%;
    background-color: #cab4ff;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #cab4ff;
    span {
        font-size: 32px;
        font-weight: 800;
        color: #382591;
        line-height: 1.5;
    }
    :hover {
        background-color: #382591;
        span {
            color: white;
        }
    }
`;

export const MatchScore = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0;
`;

export const MatchScoreLogo = styled.div`
    flex-basis: 30%;
    max-width: 30%;
    img {
        width: 100%;
    }
`;

export const MatchScoreMark = styled.div`
    flex-basis: 40%;
    max-width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
        font-size: 72px;
        color: white;
        @media screen and (max-width: 576px) {
            font-size: 54px;
        }
    }
    span.win-rt {
        color: var(--success-color);
    }
    span.lose-rt {
        color: var(--fail-color);
    }
`;

export const BetCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
    & > div {
        flex-basis: 33.33%;
        max-width: 33.33%;
        padding: 0 5px;
    }
`;

export const BetCard = styled.div`
    background-color: #382591;
    border-radius: 10px;
    height: 100%;
    button {
        width: 100%;
        padding: 5px 10px;
        background-color: var(--hover-color);
        border: 1px solid var(--hover-color);
        display: flex;
        justify-content: space-between;
        color: white;
        cursor: pointer;
        border-radius: 10px;
        span {
            font-size: 14px;
        }
        :hover {
            background-color: var(--hover-alt-color);
        }
        .score {
            font-weight: 700;
        }
    }
    div {
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        span {
            font-size: 12px;
        }
        .score {
            font-weight: 700;
            font-size: 14px;
        }
    }
    div.multi-div-rt {
        background-color: var(--hover-color);
        border-radius: 10px;
    }
    &.success-rt {
        div {
            span {
                color: var(--success-color);
            }
        }
    }
    &.fail-rt {
        div {
            span {
                color: var(--fail-color);
            }
        }
        div.win-amount-rt {
            display: none;
        }
    }
`;
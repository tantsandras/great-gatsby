import styled from 'styled-components';

const PlayLink = styled.a`
position: absolute;
top: 24em;
right: 45%;
color: #000d1a;
background: #aeeeee;
text-decoration: none;
font-family: Arial;
font-size: 1.4em;
padding: 0.8em;
border-radius: 5em;
text-transform: uppercase;

    &:hover {
        color: #aeeeee;
        background: #c3803b;
    }
`;

const GamesRulesLink = styled.a`
    position: absolute;
    top: 20em;
    right: 45%;
    color: #000d1a;
    background: #aeeeee;
    text-decoration: none;
    font-family: Arial;
    font-size: 0.6em;
    padding: 0.8em;
    border-radius: 5em;

    &:hover {
        color: #aeeeee;
        background: #c3803b;
    }
`;

export {
    PlayLink,
    GamesRulesLink
}
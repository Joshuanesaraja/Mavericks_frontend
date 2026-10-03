import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        margin: 0;
        padding: 0;
        min-height: 100%;
    }

    body {
        font-family: ${({ theme }) => theme.typography.fontFamily};
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        font-size: ${({ theme }) => theme.typography.body};
        font-weight: ${({ theme }) => theme.typography.bodyWeight};
        line-height: 1.5;
    }

    button,
    input,
    select,
    textarea {
        font: inherit;
    }

    button {
        cursor: pointer;
    }

    button:disabled {
        cursor: not-allowed;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin-top: 0;
    }

    h1 {
        font-size: ${({ theme }) => theme.typography.h1};
        font-weight: ${({ theme }) => theme.typography.headingWeight};
    }

    h2 {
        font-size: ${({ theme }) => theme.typography.h2};
        font-weight: ${({ theme }) => theme.typography.headingWeight};
    }

    h3 {
        font-size: ${({ theme }) => theme.typography.h3};
        font-weight: ${({ theme }) => theme.typography.subHeadingWeight};
    }

    input,
    select,
    textarea {
        width: 100%;
    }

    :focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.primary};
        outline-offset: 2px;
    }
`;

export default GlobalStyles;
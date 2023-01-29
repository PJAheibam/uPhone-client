import { createGlobalStyle, css } from "styled-components";

const rootVariables = (p) => css`
  --primary-hue: ${p.theme.palette.primary.hsl[0]};
  --primary-main: ${p.theme.palette.primary.main};
  --primary-light: ${p.theme.palette.primary.light};
  --primary-dark: ${p.theme.palette.primary.dark};
  --on-primary: ${p.theme.palette.primary.text};

  --secondary-main: ${p.theme.palette.secondary.main};
  --secondary-light: ${p.theme.palette.secondary.light};
  --secondary-dark: ${p.theme.palette.secondary.dark};
  --on-secondary: ${p.theme.palette.secondary.text};

  --error-main: ${p.theme.palette.error.main};
  --error-light: ${p.theme.palette.error.light};
  --error-dark: ${p.theme.palette.error.dark};
  --on-error: ${p.theme.palette.error.text};

  --warning-main: ${p.theme.palette.warning.main};
  --warning-light: ${p.theme.palette.warning.light};
  --warning-dark: ${p.theme.palette.warning.dark};
  --on-warning: ${p.theme.palette.warning.text};

  --info-main: ${p.theme.palette.info.main};
  --info-light: ${p.theme.palette.info.light};
  --info-dark: ${p.theme.palette.info.dark};
  --on-info: ${p.theme.palette.info.text};

  --success-main: ${p.theme.palette.success.main};
  --success-light: ${p.theme.palette.success.light};
  --success-dark: ${p.theme.palette.success.dark};
  --on-success: ${p.theme.palette.success.text};

  --bg: ${p.theme.palette.background.main};
  --paper: ${p.theme.palette.background.paper};

  --text-primary: ${p.theme.palette.text.primary};
  --text-secondary: ${p.theme.palette.text.secondary};
  --text-disabled: ${p.theme.palette.text.disabled};

  --border-radius: 0px;
  --border-radius-sm: 0.15rem;
  --border-radius-md: 0.25rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 1rem;

  /* PAPER ELEVATION STYLES */
  --paper-1: linear-gradient(
      0deg,
      hsl(var(--primary-main) / 5%),
      hsl(var(--primary-main) / 5%)
    ),
    linear-gradient(0deg, hsl(var(--paper)), hsl(var(--paper)));
  --paper-2: linear-gradient(
      0deg,
      hsl(var(--primary-main) / 8%),
      hsl(var(--primary-main) / 8%)
    ),
    linear-gradient(0deg, hsl(var(--paper)), hsl(var(--paper)));
  --paper-3: linear-gradient(
      0deg,
      hsl(var(--primary-main) / 11%),
      hsl(var(--primary-main) / 11%)
    ),
    linear-gradient(0deg, hsl(var(--paper)), hsl(var(--paper)));
  --paper-4: linear-gradient(
      0deg,
      hsl(var(--primary-main) / 12%),
      hsl(var(--primary-main) / 12%)
    ),
    linear-gradient(0deg, hsl(var(--paper)), hsl(var(--paper)));
  --paper-5: linear-gradient(
      0deg,
      hsl(var(--primary-main) / 14%),
      hsl(var(--primary-main) / 14%)
    ),
    linear-gradient(0deg, hsl(var(--paper)), hsl(var(--paper)));

  /* BOX SHADOWS */
  --box-shadow-sm: 0 2px 4px hsl(var(--primary-hue) 10% 5% / 50%);
  --box-shadow-md: 0 5px 10px hsl(var(--primary-hue) 10% 5% / 45%);
  --box-shadow-lg: 0 10px 20px hsl(var(--primary-hue) 10% 5% / 30%);

  /* OUTLINE */
  --outline: ${p.theme.palette.outline.main};
  --outline-variant: ${p.theme.palette.outline.variant};
  --on-outline-variant: ${p.theme.palette.outline.onVariant};
`;

export const GlobalStyles = createGlobalStyle`
    :root{
        // color palette
        ${rootVariables} 
        --gip: clamp(1.25rem, 4vw, 3rem); //global inline padding

        color-scheme: ${(p) => p.theme.palette.mode};
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *:focus-visible{
      outline: 2px solid hsl(var(--info-main));
      outline-offset: 2px;
    }

    ::-webkit-scrollbar{
      width: 10px;
    }
    ::-webkit-scrollbar-track{
      margin-block: -5px;
    }
    ::-webkit-scrollbar-track:hover{
      /* background-image: var(--paper-5); */
      background-color: hsl(var(--text-disabled) / 20%);
    }
    ::-webkit-scrollbar-thumb{
      border-radius: 5px;
      margin: 0.2px;
      background-color: hsl(var(--text-disabled) / 50%);
    }
    ::-webkit-scrollbar-thumb:hover{
      background-color: hsl(var(--text-disabled) / 80%);
    }
    ::-webkit-scrollbar-corner{}
    
    html{
        scroll-behavior: smooth;
    }

    body{
        font-family: "Poppins", sans-serif;
        color: hsl(var(--text-primary));
        background-color: hsl(var(--bg));
        overflow: overlay;
    }

    // Resetting default anchor default styles
    a {
        color: hsl(var(--text-primary));
        text-decoration: none;
    }

    /* Resetting default button styles */
    button {
        cursor: pointer;
        text-transform: capitalize;
        border: none;
        background-color: transparent;
        border-radius: 0;
      }

`;

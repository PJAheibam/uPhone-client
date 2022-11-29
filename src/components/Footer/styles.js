import { Link } from "react-router-dom";
import { device } from "../../utils/breakpoints";
import styled from "styled-components";

export const FooterContainer = styled.footer`
  padding-inline: calc((100vw - 1366px) / 2);
  background-image: var(--paper-5);
`;

export const Wrapper = styled.section`
  margin-inline: auto;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  display: grid;
  gap: 1rem;
  padding-top: 2rem;
  padding-bottom: 0.5rem;
  padding-inline: 2rem;
  @media ${device.sm} {
  }
`;

export const Heading = styled.h1`
  font-weight: 500;
  font-size: clamp(1.25rem, 5vw, 1.5rem);
  margin-bottom: 0.75rem;
  color: hsl(var(--text-primary) / 80%);
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const NavLink = styled(Link)`
  padding-block: 0.25rem;
  color: hsl(var(--text-secondary));
  &:hover {
    color: hsl(var(--text-primary));
  }
`;

export const Text = styled.p`
  color: hsl(var(--text-secondary));
  margin-block: 0.5rem;
`;

export const Header = styled.div`
  grid-column: 1/13;
  @media ${device.sm} {
    grid-column: 1/5;
  }
  @media ${device.sm} {
    grid-column: 1/4;
  }
`;
export const UsefullWrapper = styled.div`
  grid-column: 1/13;
  @media ${device.sm} {
    grid-column: 5/9;
    grid-row: 1/2;
  }
  @media ${device.md} {
    grid-column: 4/7;
  }
`;
export const BrandsWrapper = styled.div`
  grid-column: 1/13;
  @media ${device.sm} {
    display: flex;
    justify-content: center;
    grid-column: 1/13;
    /* grid-row: 2/3; */
    /* align-items: center; */
    ${Heading} {
      /* margin-left: auto; */
      margin-bottom: 0;
    }
    ${Nav} {
      margin-inline: auto;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
    }
  }
  @media ${device.md} {
    grid-column: 7/10;
    justify-content: flex-start;
    ${Heading} {
      margin-bottom: 0.75rem;
    }
    ${Nav} {
      margin-inline: 0;
      flex-direction: column;
      gap: 0;
      align-items: flex-start;
    }
  }
`;
export const SupportWrapper = styled.div`
  grid-column: 1/13;
  @media ${device.sm} {
    grid-row: 1/2;
    grid-column: 9/13;
  }
  @media ${device.md} {
    grid-column: 10/13;
    grid-row: 1/2;
  }
`;

export const CopyRight = styled.p`
  text-align: center;
  font-size: 1rem;
  color: hsl(var(--text-secondary));
  grid-column: 1/13;
`;

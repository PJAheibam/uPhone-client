import React from "react";
import styled from "styled-components";

function ProgressBar({
  containerStyles,
  width = "100%",
  value = 0,
  label = "",
  hideValue = false,
  hideLabel = false,
  hideInnerText = false,
  hidePercentage = false,
  borderRadius,
}) {
  const text = `${hideLabel ? "" : label} ${
    hideValue ? "" : hidePercentage ? value : value + "%"
  }`;
  return (
    <Container
      style={containerStyles}
      width={width}
      borderRadius={borderRadius}
    >
      <Progress value={value}>
        <Label>{hideInnerText ? "" : text}</Label>
      </Progress>
    </Container>
  );
}

export default ProgressBar;

const Container = styled.div`
  width: ${(p) => p.width};
  display: flex;
  overflow: hidden;
  background-color: hsl(var(--primary-main) / 20%);
  border-radius: ${(p) => p.borderRadius || "var(--border-radius-xl)"};
  border: 1px solid hsl(var(--outline-variant));
`;

const Progress = styled.div`
  border-radius: inherit;
  position: relative;
  width: ${(p) => p.value + "%"};
  height: 1.5rem;
  background-color: hsl(var(--primary-main));
  transition: width 150ms ease-out;
`;

const Label = styled.span`
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 0.96em;
  transform: translateY(-50%);
  font-weight: 500;
  padding-inline: 0.5em;
  color: ${(p) =>
    p.theme.palette.mode === "dark"
      ? "hsl(var(--primary-hue) 5% 10%)"
      : "hsl(var(--primary-hue) 5% 80%)"};
`;

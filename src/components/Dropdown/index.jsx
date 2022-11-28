import React, { useRef, useState } from "react";
import {
  Container,
  Icon,
  Label,
  Option,
  Options,
  OptionsWrapper,
  Select,
} from "./styles";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { useSpring, config } from "react-spring";
import { Label as TopLabel } from "../../components/formItems";

function Dropdown({
  data,
  setIndex,
  defaultLabel = "Select",
  showOther = true,
  onclick = () => {},
}) {
  const [height, setHeight] = useState(0);
  const [label, setLabel] = useState(defaultLabel);
  const [open, setOpen] = useState(false);
  const optionsRef = useRef();
  const selectRef = useRef();
  const animationApi = useSpring({
    maxHeight: height,
    opacity: height ? 1 : 0,
  });

  const arrowStyle = useSpring({
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    config: config.wobbly,
  });

  function toggleOpen() {
    setOpen((prev) => !prev);
    if (!open) setHeight(optionsRef.current.clientHeight);
    else setHeight(0);
  }

  function handleClick(e, id) {
    toggleOpen();
    setLabel(e.target.innerText);
    if (e.target.innerText.toLowerCase() === "other") {
      if (setIndex) setIndex(-1);
      onclick("", "");
    } else {
      onclick(id, e.target.innerText);
      if (setIndex) setIndex(id);
    }
  }

  return (
    <Container maxHeight={height}>
      <TopLabel style={{ marginBottom: "0.25rem" }}>{defaultLabel}</TopLabel>
      <Select ref={selectRef} onClick={toggleOpen}>
        <Label>{label}</Label>{" "}
        <Icon style={arrowStyle}>
          <ArrowDown />
        </Icon>
      </Select>
      <OptionsWrapper style={animationApi}>
        <Options ref={optionsRef}>
          {data &&
            data.map((item, i) => (
              <Option
                key={item.id || i}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.text}
              </Option>
            ))}
          {showOther && <Option onClick={handleClick}>Other</Option>}
        </Options>
      </OptionsWrapper>
    </Container>
  );
}

export default Dropdown;

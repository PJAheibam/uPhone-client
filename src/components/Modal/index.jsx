import React, { useRef } from "react";
import { animated, useSpring, useTransition } from "react-spring";
import styled from "styled-components";
import Portal from "../../services/portal";
import { MdClose } from "react-icons/md";

function Modal({ open, onClose, children }) {
  const outsideRef = useRef();
  const transApi = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  function handleClose() {
    onClose();
  }
  function handleOutsideClick(e) {
    if (outsideRef.current && outsideRef.current === e.target) onClose();
  }

  if (open) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "overlay";

  return (
    <Portal>
      {transApi(
        (styles, item) =>
          item && (
            <Container
              ref={outsideRef}
              style={styles}
              onClick={handleOutsideClick}
            >
              <Box>
                <CloseIcon onClick={handleClose}>
                  <MdClose />
                </CloseIcon>
                {children}
              </Box>
            </Container>
          )
      )}
    </Portal>
  );
}

export default Modal;

const Container = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled(animated.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 200px;
  border-radius: var(--border-radius-md);
  background-image: var(--paper-5);
`;

const CloseIcon = styled.button`
  position: absolute;
  right: 16px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 50%;
  padding: 0.1 5em;
  color: hsl(var(--error-main));
  z-index: 100;
  background-color: hsl(var(--error-main) / 10%);
  &:active {
    scale: 0.95;
  }
`;

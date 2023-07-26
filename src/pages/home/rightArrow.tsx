import React, { useState } from "react";
import styled from "styled-components";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Right({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [show, setShow] = useState(false);
  return show ? (
    <Button
      onClick={onClick}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      {children}
    </Button>
  ) : (
    <Transparent
      onMouseEnter={() => {
        setShow(true);
      }}
    />
  );
}

const Transparent = styled.div`
  width: 10rem;
  position: absolute;
  z-index: 999;
  height: 50rem;
`;

const Button = styled.button`
  cursor: pointer;
  color: black;
  cursor: pointer;
`;

export function RightArrow() {
  const { scrollNext } = React.useContext(VisibilityContext);
  return <Right onClick={() => scrollNext()}>→</Right>;
}

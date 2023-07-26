import React, { useState } from "react";
import styled from "styled-components";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Left({
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
  height: 17rem;
`;

const Button = styled.button`
  position: relative;
  cursor: pointer;
  color: white;
  height: 17rem;
  border: none;
  border-radius: 1.25rem 0 0 1.25rem;
`;

export function LeftArrow() {
  const { scrollPrev } = React.useContext(VisibilityContext);
  console.log(VisibilityContext)
  return <Left onClick={() => scrollPrev()}>←</Left>;
}
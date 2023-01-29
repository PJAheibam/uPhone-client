import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useComponentSize } from "react-use-size";
import { GradientButton } from "../../../components/Button";
import { useBrands } from "../../../hooks/useBrands";
import Items from "./Items";
import {
  ActiveIndicator,
  HeaderButton,
  Container,
  Header,
  Heading,
} from "./styles";
import { FreeMode, Scrollbar } from "swiper";
import Skeleton from "react-loading-skeleton";

function CategorySection() {
  const { data = [], isLoading } = useBrands();
  const [selectedID, setSelectedID] = useState("all");
  const [leftCons, setLeftCons] = useState(0);
  // const containerRef = useRef();
  const { ref: containerRef, width } = useComponentSize();

  useEffect(() => {
    setLeftCons(width - 32 - containerRef.current.scrollWidth);
  }, [width]);
  //   consoles
  // console.info(width);

  return (
    <Container ref={containerRef}>
      <Heading>Browse phones by brand name</Heading>
      <Header
        slidesPerView="auto"
        spaceBetween={30}
        freeMode={true}
        scrollbar={{
          hide: true,
        }}
        modules={[FreeMode, Scrollbar]}
        className="mySwiper"
      >
        <HeaderButton onClick={() => setSelectedID("all")}>
          All
          {selectedID === "all" && (
            <ActiveIndicator className="underline" layoutId="underline" />
          )}
        </HeaderButton>
        {isLoading &&
          [...Array(8).keys()].map((i) => (
            <HeaderButton style={{ padding: 0 }}>
              <Skeleton width={70} height={28} />
            </HeaderButton>
          ))}
        {data.map((item, i) => (
          <HeaderButton key={i} onClick={() => setSelectedID(item._id)}>
            {item.name}
            {item._id === selectedID && (
              <ActiveIndicator className="underline" layoutId="underline" />
            )}
          </HeaderButton>
        ))}
      </Header>
      <Items productID={selectedID} />
      <GradientButton
        as={Link}
        to="/browse/all"
        style={{ width: "fit-content", marginInline: "auto" }}
      >
        View More
      </GradientButton>
    </Container>
  );
}

export default CategorySection;

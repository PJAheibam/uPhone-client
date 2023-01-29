import React from "react";
import { useState } from "react";
import { useBrands } from "../../../hooks/useBrands";
import Items from "./Items";
import {
  ActiveIndicator,
  HeaderButton,
  Container,
  Header,
  Heading,
} from "./styles";

function CategorySection() {
  const { data = [], isLoading } = useBrands();
  const [selectedID, setSelectedID] = useState("all");

  //   consoles
  //   console.info(selectedID);

  return (
    <Container>
      <Heading>Browse phones by brand name</Heading>
      <Header>
        <HeaderButton onClick={() => setSelectedID("all")}>
          All
          {selectedID === "all" && (
            <ActiveIndicator className="underline" layoutId="underline" />
          )}
        </HeaderButton>
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
    </Container>
  );
}

export default CategorySection;

import React from "react";
import PrototypicalInheritance from "./PrototypicalInheritance";
import ReactAngVue from "./ReactAngVue";
import ReactState from "./ReactState";
import { Container, Heading } from "./styles";
import UnitTest from "./UnitTest";

function Blog() {
  return (
    <Container>
      <Heading>Blog</Heading>
      <ReactState />
      <PrototypicalInheritance />
      <UnitTest />
      <ReactAngVue />
    </Container>
  );
}

export default Blog;

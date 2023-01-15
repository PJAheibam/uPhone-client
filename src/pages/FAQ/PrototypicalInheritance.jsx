import React from "react";
import { Article, Text, Title } from "./styles";

function PrototypicalInheritance() {
  return (
    <Article>
      <Title>2. How does prototypical inheritance work?</Title>
      <Text>
        Every object with its methods and properties contains an internal and
        hidden property known as [[Prototype]].
      </Text>
      <Text>
        The Prototypal Inheritance is a feature in javascript used to add
        methods and properties in objects. It is a method by which an object can
        inherit the properties and methods of another object. Traditionally, in
        order to get and set the [[Prototype]] of an object, we use
        Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern
        language, it is being set using __proto__.
      </Text>
    </Article>
  );
}

export default PrototypicalInheritance;

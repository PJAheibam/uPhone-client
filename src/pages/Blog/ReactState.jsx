import React from "react";
import { Article, Text, Title } from "./styles";

function ReactState() {
  return (
    <Article>
      <Title>
        What are the different ways to manage a state in a React application?
      </Title>
      <Text>
        There are four main types of state you need to properly manage in your
        React apps:
        <ol style={{ marginLeft: "var(--gip)", marginBlock: "0.2rem" }}>
          <li>Local State</li>
          <li>Global State</li>
          <li>Server State</li>
          <li>URL State</li>
        </ol>
      </Text>
      <Text>
        <strong>Local (UI) state</strong> – Local state is data we manage in one
        or another component. Local state is most often managed in React using
        the useState hook. For example, local state would be needed to show or
        hide a modal component or to track values for a form component, such as
        form submission, when the form is disabled and the values of a form’s
        inputs.
      </Text>
      <Text>
        <strong>Global (UI) state</strong> – Global state is data we manage
        across multiple components. Global state is necessary when we want to
        get and update data anywhere in our app, or in multiple components at
        least. A common example of global state is authenticated user state. If
        a user is logged into our app, it is necessary to get and change their
        data throughout our application. Sometimes state we think should be
        local might become global.
      </Text>
      <Text>
        <strong>Server state</strong> – Data that comes from an external server
        that must be integrated with our UI state. Server state is a simple
        concept, but can be hard to manage alongside all of our local and global
        UI state. There are several pieces of state that must be managed every
        time you fetch or update data from an external server, including loading
        and error state. Fortunately there are tools such as SWR and React Query
        that make managing server state much easier.
      </Text>
      <Text>
        <strong>URL state</strong> – Data that exists on our URLs, including the
        pathname and query parameters. URL state is often missing as a category
        of state, but it is an important one. In many cases, a lot of major
        parts of our application rely upon accessing URL state. Try to imagine
        building a blog without being able to fetch a post based off of its slug
        or id that is located in the URL!
      </Text>
      <a
        href="https://www.freecodecamp.org/news/how-to-manage-state-in-your-react-apps/#:~:text=The%20Four%20Kinds%20of%20React%20State%20to%20Manage&text=Local%20state,URL%20state"
        target="_blank"
      >
        Source: <i>freeCodeCamp</i>
      </a>
    </Article>
  );
}

export default ReactState;

import React from "react";
import { Article, Text, Title } from "./styles";

function UnitTest() {
  return (
    <Article>
      <Title>3. What is a unit test? Why should we write unit tests?</Title>
      <Text>
        Unit testing is a type of software testing where individual units or
        software components are tested. Its purpose is to validate that each
        unit of code performs as expected. A unit can be anything you want it to
        be — a line of code, a method, or a class. Generally, smaller tests are
        better as they give a more granular view of your code’s performance.
        Also, when you test very small units, your tests can run fast, like a
        thousand tests in a second fast.
      </Text>
      <Text>
        To justify any effort in business, there must be a positive impact on
        the bottom line. Here are a few benefits to writing unit tests:
        <ul style={{ marginLeft: "var(--gip)" }}>
          <li>
            Unit tests save time and money. Usually, we tend to test the happy
            path more than the unhappy path. If you release such an app without
            thorough testing, you would have to keep fixing issues raised by
            your potential users. The time to fix these issues could’ve been
            used to build new features or optimize the existing system. Bear in
            mind that fixing bugs without running tests could also introduce new
            bugs into the system.
          </li>
          <li>
            Well-written unit tests act as documentation for your code. Any
            developer can quickly look at your tests and know the purpose of
            your functions. It simplifies the debugging process.
          </li>
          <li>It simplifies the debugging process.</li>
          <li>
            Unit testing is an integral part of extreme programming. Extreme
            programming is basically a “test-everything-that-can-possibly-break”
            programming strategy.
          </li>
          <li>
            Unit tests make code reuse easier. If you want to reuse existing
            code in a new project, you can simply migrate both the code and
            tests to your new project, then run your tests to make sure you have
            the desired results.
          </li>
          <li>
            Unit testing improves code coverage. A debatable topic is to have
            100% code coverage across your application.
          </li>
          <li>
            In the testing pyramid, unit tests are faster than integration and
            end-to-end. They are more assertive and return quick feedback.
          </li>
        </ul>
      </Text>
      <Text>
        Source:{" "}
        <a href="https://moduscreate.com/blog/heres-why-you-should-write-unit-tests/">
          <i>Modus Create</i>
        </a>
      </Text>
    </Article>
  );
}

export default UnitTest;

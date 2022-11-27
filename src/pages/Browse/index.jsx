import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import client from "../../api";
import { device } from "../../utils/breakpoints";
import Card, { CardSkeleton } from "./Card";
import Sidebar from "./Sidebar";

function Browse() {
  const { id } = useParams();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await client.get(`/products?brandId=${id}`);
      return res.data;
    },
    // refetchOnMount: true,
  });

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <Container>
      <Sidebar />
      <MainSection>
        <Cards>
          {isLoading &&
            [...Array(6).keys()].map((i) => <CardSkeleton key={i} />)}
          {!isLoading &&
            data.map((item) => <Card key={item._id} data={item} />)}
        </Cards>
      </MainSection>
    </Container>
  );
}

export default Browse;

const Container = styled.article`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: auto;
  min-height: calc(100vh - 55px);
`;

const MainSection = styled.section`
  grid-column: 1/13;
  padding-block: 2rem;
  padding-inline: var(--gip);
  @media ${device.md} {
    grid-column: 4/13;
    padding-block: 2rem;
    padding-left: 2rem;
    padding-right: var(--gip);
  }
`;

const Cards = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  grid-auto-rows: 1fr;
  gap: 1rem;
`;

import React from "react";
import Item, { ItemSkeleton } from "./Item";
import styled from "styled-components";
import { useAuth } from "../../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import client from "../../../../api";
import { device } from "../../../../utils/breakpoints";
import { useWindowSize } from "react-use-size";
import { useState } from "react";
import { useEffect } from "react";

function Items({ productID }) {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const [totalSkeleton, setTotalSkelton] = useState(4);

  const { data = [], isLoading } = useQuery({
    queryKey: ["products", productID],
    queryFn: async () => {
      const res = await client.get(
        `/products?brandId=${productID}&uid=${user?.uid}`
      );
      return res.data;
    },
    // refetchOnMount: true,
  });

  useEffect(() => {
    if (width >= 900) setTotalSkelton(8);
    else if (width >= 1024) setTotalSkelton(12);
  }, [width]);

  /* CONSOLES */
  // console.info(data[0]);

  return (
    <Container>
      {isLoading &&
        [...Array(totalSkeleton).keys()].map((i) => <ItemSkeleton key={i} />)}
      {data.slice(0, totalSkeleton).map((item) => (
        <Item data={item} key={item._id} />
      ))}
    </Container>
  );
}

export default Items;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media ${device.sm} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${device.md} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media ${device.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

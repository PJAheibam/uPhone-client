import React from "react";
import Item from "./Item";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import client from "../../../../api";
import { device } from "../../../../utils/breakpoints";

function Items({ productID }) {
  const { user } = useAuth();
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

  /* CONSOLES */
  // console.info(data[0]);

  return (
    <Container layout>
      <AnimatePresence>
        {data.map((item) => (
          <Item data={item} key={item._id} />
        ))}
      </AnimatePresence>
    </Container>
  );
}

export default Items;

const Container = styled(motion.div)`
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

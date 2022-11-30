import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import client from "../../api";
import { useBrands } from "../../hooks/useBrands";
import { device } from "../../utils/breakpoints";
import Card, { CardSkeleton } from "./Card";
import Sidebar from "./Sidebar";
import Dropdown from "../../components/Dropdown";
import BookNowModal from "./BookNowModal";
import { useAuth } from "../../context/AuthContext";
import { PhotoProvider } from "react-photo-view";

function Browse() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { data: brands = [] } = useBrands();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await client.get(`/products?brandId=${id}&uid=${user?.uid}`);
      return res.data;
    },
    // refetchOnMount: true,
  });

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <Container>
      <BookNowModal product={product} user={user} setProduct={setProduct} />
      <Sidebar />
      <MainSection>
        <Header>
          <Dropdown
            showOther={false}
            label="Category"
            defaultValue="Select Category"
            selectButtonStyle={{ marginBottom: "1rem", width: "14rem" }}
            data={[
              { id: "all", text: "All" },
              ...brands.map((brand) => ({ id: brand._id, text: brand.name })),
            ]}
            onclick={(id) => navigate("/category/" + id)}
          />
        </Header>
        <Cards>
          <PhotoProvider>
            {isLoading &&
              [...Array(6).keys()].map((i) => <CardSkeleton key={i} />)}
            {!isLoading &&
              data.map((item) => (
                <Card key={item._id} data={item} setProduct={setProduct} />
              ))}
          </PhotoProvider>
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
    grid-column: 3/13;
    padding-block: 2rem;
    padding-left: 2rem;
    padding-right: var(--gip);
  }
`;

const Cards = styled.section`
  display: grid;
  grid-auto-rows: 1fr;
  gap: 1rem;
  grid-template-columns: 1;
  @media ${device.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${device.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Header = styled.div`
  grid-column: 1/2;
  display: flex;
  @media ${device.md} {
    display: none;
  }
`;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import client from "../../api";
import { T, Table } from "../../components/Table";
import { useAuth } from "../../context/AuthContext";

function MyProducts() {
  const { user, loading } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["my-products", user.uid],
    queryFn: fetchData,
    refetchOnMount: true,
    enabled: loading ? false : true,
  });

  async function fetchData() {
    try {
      const url = "/products?uid=" + user.uid;
      const res = await client.get(url);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  return (
    <Container>
      <Heading>List of my products</Heading>
      <Table>
        <T.Head>
          <T.Row>
            <T.Heading>No</T.Heading>
            <T.Heading>Name</T.Heading>
            <T.Heading>Selling Price</T.Heading>
            <T.Heading>Status</T.Heading>
            <T.Heading>Advertise</T.Heading>
          </T.Row>
        </T.Head>
        <T.Body>
          {data.map((item, i) => (
            <T.Row key={item._id}>
              <T.Data>{i + 1}</T.Data>
              <T.Data>{item.name}</T.Data>
              <T.Data>{item.sellingPrice}</T.Data>
              <T.Data>{item.status}</T.Data>
              <T.Data>{item.advertise.toString()}</T.Data>
            </T.Row>
          ))}
        </T.Body>
      </Table>
    </Container>
  );
}

export default MyProducts;

const Container = styled.div``;

const Heading = styled.h1`
  margin-bottom: 2rem;
`;

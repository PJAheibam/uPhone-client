import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Container, Heading } from "./styles";
import client from "../../api/";
import { useAuth } from "../../context/AuthContext";
import { Table, T, Icon, More } from "../../components/Table";
import { Badge } from "../../components/Badge";
import Skeleton from "react-loading-skeleton";

function ManageUser() {
  const { user } = useAuth();
  const { isLoading, data = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const url = `/users?uid=${user.uid}`;
      const res = await client.get(url);
      return res.data;
    },
    enabled: user.uid ? true : false,
  });

  //   console.info(data);

  return (
    <Container>
      <Heading>All Users</Heading>
      <Table>
        <T.Head>
          <T.Row>
            <T.Heading>No</T.Heading>
            <T.Heading>Name</T.Heading>
            <T.Heading>Email</T.Heading>
            <T.Heading>Verified</T.Heading>
            <T.Heading>Acc Type</T.Heading>
          </T.Row>
        </T.Head>
        <T.Body>
          {isLoading &&
            [...Array(10).keys()].map((i) => (
              <T.Row key={i}>
                <T.Data>
                  <Skeleton />
                </T.Data>
                <T.Data>
                  <Skeleton />
                </T.Data>
                <T.Data>
                  <Skeleton />
                </T.Data>
                <T.Data>
                  <Skeleton />
                </T.Data>
                <T.Data>
                  <Skeleton />
                </T.Data>
              </T.Row>
            ))}
          {!isLoading &&
            data.map((user, i) => (
              <T.Row key={user._id}>
                <T.Data>{i + 1}</T.Data>
                <T.Data>{user.fullName}</T.Data>
                <T.Data>{user.email}</T.Data>
                <T.Data>
                  {user?.verified ? (
                    <Badge color="success">varified</Badge>
                  ) : (
                    <Badge color="error">not-verified</Badge>
                  )}
                </T.Data>
                <T.Data>{user.role}</T.Data>
              </T.Row>
            ))}
        </T.Body>
      </Table>
    </Container>
  );
}

export default ManageUser;

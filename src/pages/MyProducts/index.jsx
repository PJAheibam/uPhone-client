import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import client from "../../api";
import { More, T, Table, Icon } from "../../components/Table";
import { useAuth } from "../../context/AuthContext";
import { RiMore2Fill as MoreIcon } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import { MenuContainer, MenuItem, MenuText } from "../../components/menu";
import useClickOutside from "../../hooks/useClickOutside";
import { toast } from "react-hot-toast";

function MyProducts() {
  const { user, loading } = useAuth();
  const [id, setId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const [visableMenu, setVisableMenu] = useState(false);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-products", user.uid],
    queryFn: fetchData,
    refetchOnMount: true,
    enabled: user.uid ? true : false,
  });

  async function fetchData() {
    const url = "/my-products?uid=" + user.uid;
    const res = await client.get(url);
    // console.log(res.data);
    return res.data;
  }

  function handleMenuClick(e, _id) {
    e.preventDefault();
    setId(_id);
    setVisableMenu((prev) => !prev);
    const { top, left } = e.target.getBoundingClientRect();
    setMenuPosition({ x: top, y: left });
  }

  return (
    <Container>
      <Heading>List of my products</Heading>

      <Table style={{ overflow: "auto" }}>
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
          {data.map((item, i) => (
            <T.Row key={item._id}>
              <T.Data>{i + 1}</T.Data>
              <T.Data>{item.name}</T.Data>
              <T.Data>{item.sellingPrice}</T.Data>
              <T.Data>{item.status}</T.Data>
              <T.Data>{item.advertise.toString()}</T.Data>
              <More>
                <Icon onClick={(e) => handleMenuClick(e, item._id)}>
                  <MoreIcon style={{ pointerEvents: "none" }} />
                </Icon>
              </More>
            </T.Row>
          ))}
        </T.Body>
      </Table>
      <Menu
        x={menuPosition.x}
        y={menuPosition.y}
        open={visableMenu}
        setOpen={setVisableMenu}
        id={id}
        refetch={refetch}
      />
    </Container>
  );
}

function Menu({ x, y, open, setOpen, id, refetch }) {
  const { user } = useAuth();
  const ref = useClickOutside(() => setOpen(false));
  const body = document.querySelector("body");
  if (open) {
    body.style.overflow = "hidden";
  } else body.style.overflow = "overlay";

  function handleDelete() {
    setOpen((prev) => !prev);
    const deleteToastId = toast.loading("Deleting...");
    client
      .delete(`/products?id=${id}&uid=${user.uid}`)
      .then((_res) => {
        refetch();
        toast.success("Product Removed!", { id: deleteToastId });
      })
      .catch((err) => {
        console.error(err);
        toast.success("Product Removed!", { id: deleteToastId });
      });
  }

  return (
    <MenuContainer
      ref={ref}
      style={{
        position: "fixed",
        top: x + 15,
        left: y,
        width: "fit-content",
        transform: "translateX(-100%)",
        display: open ? "block" : "none",
      }}
    >
      <MenuItem>
        <MenuText>Advertise Products</MenuText>
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <MenuText>Delete Product</MenuText>
      </MenuItem>
    </MenuContainer>
  );
}

export default MyProducts;

const Container = styled.div``;

const Heading = styled.h1`
  margin-bottom: 2rem;
`;

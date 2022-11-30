import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import client from "../../api";
import {
  More,
  T,
  Table,
  Icon,
  ThumbContainer,
  Thumb,
} from "../../components/Table";
import { useAuth } from "../../context/AuthContext";
import { RiMore2Fill as MoreIcon } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import { MenuContainer, MenuItem, MenuText } from "../../components/menu";
import useClickOutside from "../../hooks/useClickOutside";
import { toast } from "react-hot-toast";
import Portal from "../../services/portal";
import { usePopper } from "react-popper";
import { Badge } from "../../components/Badge";
// import axios from "axios";

function MyProducts() {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
  });
  const menuRef = useClickOutside(() => setVisibleMenu(false));
  const { user } = useAuth();
  const [id, setId] = useState(null); //product id

  const [visibleMenu, setVisibleMenu] = useState(false);

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
    const res = await client.get(url, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });
    // console.log(res.data);
    return res.data;
  }

  function handleMenuClick(e, _id) {
    setReferenceElement(e.currentTarget);
    setId(_id);
    setVisibleMenu((prev) => !prev);
  }

  async function handleDelete() {
    setVisibleMenu((prev) => !prev);
    const deleteToastId = toast.loading("Deleting...");
    try {
      const res = await client.delete(`/products?id=${id}&uid=${user.uid}`);

      refetch();

      toast.success("Product Removed!", { id: deleteToastId });
    } catch (err) {
      toast.success("Erro Occur While Deleting", { id: deleteToastId });
    }
  }

  async function handleAdvertise() {
    const toastId = toast.loading("Updating...");
    const selectedProduct = data.find((item, i) => item._id === id);
    // console.info(selectedProduct);
    try {
      const res = await client.patch(`/products/${id}`, {
        advertise: !selectedProduct.advertise,
      });
      toast.success("Updated", { id: toastId });
      refetch();
    } catch (err) {
      toast.error("An error occur while updating.", { id: toastId });
    }
  }

  console.log("data", data);

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
              <T.Data>
                <ThumbContainer>
                  <Thumb src={item?.images[0]?.display_url} alt={item.name} />
                  {item.name}
                </ThumbContainer>
              </T.Data>
              <T.Data>{item.sellingPrice}</T.Data>
              <T.Data>{item.status}</T.Data>
              <T.Data>
                <Badge color={item.advertise ? "success" : "error"}>
                  {item.advertise.toString()}
                </Badge>
              </T.Data>
              <More>
                <Icon onClick={(e) => handleMenuClick(e, item._id)}>
                  <MoreIcon style={{ pointerEvents: "none" }} />
                </Icon>
              </More>
            </T.Row>
          ))}
        </T.Body>
      </Table>
      <Portal>
        <MenuContainer
          ref={(el) => {
            setPopperElement(el);
            menuRef.current = el;
          }}
          style={{
            visibility: visibleMenu ? "visible" : "hidden",
            width: "fit-content",
            ...styles.popper,
          }}
          {...attributes.popper}
        >
          <MenuItem
            style={{
              fontSize: "0.9rem",
            }}
            onClick={handleAdvertise}
          >
            <MenuText>Toggle Advertise</MenuText>
          </MenuItem>
          <MenuItem
            color="error"
            onClick={handleDelete}
            style={{
              fontSize: "0.9rem",
            }}
          >
            <MenuText>Delete Product</MenuText>
          </MenuItem>
        </MenuContainer>
      </Portal>
    </Container>
  );
}

export default MyProducts;

const Container = styled.div``;

const Heading = styled.h1`
  margin-bottom: 2rem;
`;

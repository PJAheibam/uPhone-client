import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { ChangeButton, Container, Heading } from "./styles";
import client from "../../api/";
import { useAuth } from "../../context/AuthContext";
import { Table, T, Icon, More } from "../../components/Table";
import { Badge } from "../../components/Badge";
import Skeleton from "react-loading-skeleton";
import { CgArrowsExchangeV as DropIcon } from "react-icons/cg";
import { RiMore2Fill as MoreIcon } from "react-icons/ri";
import Portal from "../../services/portal";
import { MenuContainer, MenuItem, MenuText } from "../../components/menu";
import { usePopper } from "react-popper";
import useClickOutside from "../../hooks/useClickOutside";
import Modal from "../../components/Modal";
import { update } from "react-spring";

function ManageUser() {
  const referenceElement = useRef();
  const [modalData, setModalData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [popperElement, setPopperElement] = useState(null);
  const [visible, setVisible] = useState(false);
  const verifyMenuRef = useClickOutside(() => setVisible(false));

  // console.info(openModal);

  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement,
    {
      placement: "bottom-start",
    }
  );

  const { user: admin } = useAuth();
  const {
    isLoading,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const url = `/users?uid=${admin.uid}`;
      const res = await client.get(url);
      return res.data;
    },
    enabled: admin.uid ? true : false,
  });

  function handleVerified(e, user) {
    e.stopPropagation();
    referenceElement.current = e.currentTarget;
    setVisible((prev) => !prev);
    // setOpenModal(true);
    setModalData(user);
  }
  // console.info(modalData);
  useEffect(() => {}, []);

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
                  <ChangeButton onClick={(e) => handleVerified(e, user)}>
                    <DropIcon size="1rem" />
                    {user?.verified ? (
                      <Badge color="success">verified</Badge>
                    ) : (
                      <Badge color="error">not-verified</Badge>
                    )}
                  </ChangeButton>
                </T.Data>
                <T.Data style={{ textTransform: "capitalize" }}>
                  {user.role}
                </T.Data>
                <More>
                  <Icon>
                    <MoreIcon />
                  </Icon>
                </More>
              </T.Row>
            ))}
        </T.Body>
      </Table>
      <Portal>
        <MenuContainer
          ref={(element) => {
            setPopperElement(element);
            verifyMenuRef.current = element;
          }}
          style={{
            ...styles.popper,
            visibility: visible ? "visible" : "hidden",
            width: "fit-content",
          }}
          {...attributes.popper}
        >
          <MenuItem style={{ fontSize: "0.95rem" }}>verified</MenuItem>
          <MenuItem style={{ fontSize: "0.95rem" }}>not-verified</MenuItem>
        </MenuContainer>
      </Portal>
    </Container>
  );
}

export default ManageUser;

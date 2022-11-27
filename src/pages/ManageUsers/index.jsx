import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
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
import VerifyModal from "../../components/VerifyModal";

function ManageUser() {
  const referenceElement = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [popperElement, setPopperElement] = useState(null);
  const [visable, setVisable] = useState(false);
  const verifyMenuRef = useClickOutside(() => setVisable(false));

  // console.info(openModal);

  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement,
    {
      placement: "bottom-start",
    }
  );

  const { user: admin } = useAuth();
  const { isLoading, data = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const url = `/users?uid=${admin.uid}`;
      const res = await client.get(url);
      return res.data;
    },
    enabled: admin.uid ? true : false,
  });

  function handleVerified(e) {
    referenceElement.current = e.currentTarget;
    setVisable((prev) => !prev);
    setOpenModal(true);
  }

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
                  <ChangeButton onClick={handleVerified}>
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
            display: visable ? "block" : "none",
          }}
          {...attributes.popper}
        >
          <MenuItem style={{ fontSize: "0.95rem" }}>verified</MenuItem>
          <MenuItem style={{ fontSize: "0.95rem" }}>not-verified</MenuItem>
        </MenuContainer>
      </Portal>
      {/* Modal */}
      <VerifyModal open={openModal} setOpen={setOpenModal} />
    </Container>
  );
}

export default ManageUser;

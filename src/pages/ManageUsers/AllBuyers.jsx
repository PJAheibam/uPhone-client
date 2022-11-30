import React, { useRef, useState } from "react";
import { VerifyStatus, Container, Heading } from "./styles";
import { useAuth } from "../../context/AuthContext";
import { Table, T, Icon, More, ThumbContainer } from "../../components/Table";
import { Badge } from "../../components/Badge";
import Skeleton from "react-loading-skeleton";
import { CgArrowsExchangeV as DropIcon } from "react-icons/cg";
import { RiMore2Fill as MoreIcon } from "react-icons/ri";
import Portal from "../../services/portal";
import { MenuContainer, MenuItem, MenuText } from "../../components/menu";
import { usePopper } from "react-popper";
import useClickOutside from "../../hooks/useClickOutside";
import { updateUser } from "../../services/updateUser";
import { deleteUser } from "../../services/deleteUser";
import useUsersData from "../../hooks/useUsersData";
import { Thumb } from "../MyBookings/styles";
import userIcon from "../../assets/icons/user.png";

function AllBuyers() {
  const referenceElement = useRef();
  const { user: admin } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [visible, setVisible] = useState(false);
  const verifyMenuRef = useClickOutside(() => setVisible(false));

  // console.info(openModal);

  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement,
    {
      placement: "bottom-end",
    }
  );

  const { isLoading, data = [], refetch } = useUsersData(admin.uid, "buyer");

  function handleVerified(e, user) {
    e.stopPropagation();
    referenceElement.current = e.currentTarget;
    setVisible((prev) => !prev);
    // setOpenModal(true);
    setSelectedUser(user);
  }

  async function handleUserVerification() {
    setVisible(false);
    await updateUser(admin, selectedUser, { verified: !selectedUser.verified });
    refetch();
  }

  async function handleDeleteClick() {
    await deleteUser(admin, selectedUser.uid);
    setVisible(false);
    refetch();
  }

  // console.info(data);

  return (
    <Container>
      <Heading>Sellers list</Heading>
      <Table>
        <T.Head>
          <T.Row>
            <T.Heading>No</T.Heading>
            <T.Heading>Name</T.Heading>
            <T.Heading>Email</T.Heading>
            <T.Heading>Verified</T.Heading>
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
              </T.Row>
            ))}
          {!isLoading &&
            data.map((user, i) => (
              <T.Row key={user._id}>
                <T.Data>{i + 1}</T.Data>
                <T.Data>
                  <ThumbContainer>
                    <Thumb
                      src={user?.profilePhoto?.display_url || userIcon}
                      alt={user?.fullName}
                    />
                    {user?.fullName}
                  </ThumbContainer>
                </T.Data>
                <T.Data>{user.email}</T.Data>
                <T.Data>
                  <VerifyStatus>
                    <DropIcon size="1rem" />
                    {user?.verified ? (
                      <Badge color="success">verified</Badge>
                    ) : (
                      <Badge color="error">not-verified</Badge>
                    )}
                  </VerifyStatus>
                </T.Data>
                <More>
                  <Icon onClick={(e) => handleVerified(e, user)}>
                    <MoreIcon />
                  </Icon>
                </More>
              </T.Row>
            ))}
        </T.Body>
      </Table>

      {/* VERIFIY MENU */}
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
            fontSize: "0.95rem",
          }}
          {...attributes.popper}
        >
          <MenuItem onClick={handleUserVerification}>
            {selectedUser?.verified ? "unverify" : "verify"}
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </MenuContainer>
      </Portal>

      {/* MORE MENU */}
      <Portal>
        <MenuContainer></MenuContainer>
      </Portal>
    </Container>
  );
}

export default AllBuyers;

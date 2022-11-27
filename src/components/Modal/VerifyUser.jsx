import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import userIcon from "../../assets/icons/user.png";
import { verifyUser } from "../../services/verifyUser";
import { useAuth } from "../../context/AuthContext";

function Confirmation({ data, handleCancel }) {
  const { user, refetch } = data;
  const { user: admin } = useAuth();
  async function handleConfirm() {
    handleCancel();
    await verifyUser(admin, user);
    refetch();
  }
  return (
    <Container>
      <User>
        <Avatar src={user?.photoURL || userIcon} alt="user avatar" />
        <Name>{user?.fullName}</Name>
      </User>
      <Text>Will be verified.</Text>
      <Buttons>
        <Button
          type="button"
          variant="filled"
          color="primary"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
        <Button
          onClick={handleCancel}
          type="button"
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
      </Buttons>
    </Container>
  );
}

export default Confirmation;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-height: 200px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  ${Button} {
    font-size: 1rem;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  margin-block: auto;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.img`
  width: clamp(40px, 5vw, 80px);
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  box-shadow: inset 0 0 3px rgb(0, 0, 0, 0.25);
`;

const Name = styled.p`
  font-size: 1.15rem;
`;

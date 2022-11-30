import React from "react";
import { Container, Heading, Product, Thumb } from "./styles";
import { Table, T, Icon, More } from "../../components/Table";
import useMyBookingsData from "../../hooks/useMyBookingsData";
import { useAuth } from "../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";

function MyBookings() {
  const { user } = useAuth();
  const { data = [], isLoading } = useMyBookingsData(user.uid);

  // console.info(data);

  return (
    <Container>
      <Heading>My Bookings</Heading>
      <Table>
        <T.Head>
          <T.Row>
            <T.Heading>No</T.Heading>
            <T.Heading>Product</T.Heading>
            <T.Heading>Price</T.Heading>
            <T.Heading>Seller</T.Heading>
            <T.Heading>Payment Status</T.Heading>
          </T.Row>
        </T.Head>
        <T.Body>
          {isLoading &&
            [...Array(10).keys()].map((i) => (
              <T.Row key={i}>
                <T.Data>
                  {" "}
                  <Skeleton />{" "}
                </T.Data>
                <T.Data>
                  {" "}
                  <Skeleton />{" "}
                </T.Data>
                <T.Data>
                  {" "}
                  <Skeleton />{" "}
                </T.Data>
                <T.Data>
                  {" "}
                  <Skeleton />{" "}
                </T.Data>
                <T.Data>
                  {" "}
                  <Skeleton />{" "}
                </T.Data>
              </T.Row>
            ))}
          {!isLoading &&
            data.map((booking, i) => (
              <T.Row key={booking._id}>
                <T.Data>{i + 1}</T.Data>
                <T.Data>
                  <Product>
                    <Thumb src={booking?.product[0]?.images[0]?.display_url} />
                    {booking?.product[0]?.name}
                  </Product>
                </T.Data>
                <T.Data>{booking?.product[0]?.sellingPrice}</T.Data>
                <T.Data>{booking?.seller[0]?.fullName}</T.Data>
                <T.Data>
                  <Badge color={booking?.paymentStatus ? "success" : "warning"}>
                    {booking?.paymentStatus ? "Paid" : "Not Paid"}
                  </Badge>
                </T.Data>
                {!booking?.paymentStatus && (
                  <More>
                    <Button style={{ fontSize: "0.9rem" }}>Pay Now</Button>
                  </More>
                )}
              </T.Row>
            ))}
        </T.Body>
      </Table>
    </Container>
  );
}

export default MyBookings;

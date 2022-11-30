import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
// import axios from "../../api/axios";
// import { BookingDataType } from "../../api/insert-booking-data";
import { useAuth } from "../../context/AuthContext";
import client from "../../api";
import useClientSecret from "../../hooks/useClientSecret";
// import {
//   Table,
//   T_Body,
//   T_Head,
// } from "../../components/Table";

function Payment() {
  const { id } = useParams();
  const { user } = useAuth();
  const data = [];
  const isLoading = false;
  //   const { data, isLoading } = useQuery(["bookings", id], fetchData);
  const stripe = useStripe();
  const elements = useElements();
  const { data: clientSecret } =
    useClientSecret();
    // booking?._id,
    // booking?.product[0]?.sellingPrice

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: data?.fullName || "",
            email: data?.email || "",
            phone: data?.phoneNumber.toString() || "",
          },
        },
      });
    if (confirmError) {
      console.error(confirmError);
    }
    if (paymentIntent?.status === "succeeded") {
      console.info("payment-intent", paymentIntent);
    }
  }

  console.info("Stripe js");

  return (
    <Container>
      {/* <Table>
        <TableSection>
          <T_Head>
            <Tr>
              <Th colSpan={2} style={{ textAlign: "center" }}>
                Payment Information
              </Th>
            </Tr>
          </T_Head>
          <T_Body>
            <Tr>
              <Th>Treatment Name</Th>
              <Tb>{data?.treatmentName || <Skeleton />}</Tb>
            </Tr>
            <Tr>
              <Th>Patient Name</Th>
              <Tb>{data?.fullName || <Skeleton />}</Tb>
            </Tr>
            <Tr>
              <Th>Email</Th>
              <Tb>{data?.email || <Skeleton />}</Tb>
            </Tr>
            <Tr>
              <Th>Price</Th>
              <Tb>{data?.price || <Skeleton />}</Tb>
            </Tr>
          </T_Body>
        </TableSection>
      </Table> */}
      <Form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <PayBtn type="submit" disabled={!clientSecret || !stripe}>
          Pay
        </PayBtn>
      </Form>
    </Container>
  );
}

export default Payment;

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const PayBtn = styled.button`
  cursor: pointer;
  font-size: 1.15rem;
  padding: 0.25rem 0.75rem;
  margin-top: 1rem;
  width: fit-content;
  background-color: ${(p) => p.theme.palette.primary.main.bg};
`;

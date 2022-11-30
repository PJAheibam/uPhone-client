import React, { useState } from "react";
import styled, { css } from "styled-components";
import { GradientButton } from "../../components/Button";
import Modal from "../../components/Modal";
import { toast } from "react-hot-toast";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useClientSecret from "../../hooks/useClientSecret";

function PaymentModal({ booking, user, setBooking }) {
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = useState(false);
  const { data: clientSecret } = useClientSecret(
    booking?._id,
    booking?.product[0]?.sellingPrice
  );

  // console.log(submitting);

  function handleModalClose() {
    setBooking(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const toastId = toast.loading("Paying...");
    try {
      const card = elements.getElement(CardElement);
      if (!user?.uid) throw "Only loged in user can report";
      if (!stripe || !elements) {
        return;
      }

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

      const {} = await stripe
        .confirmCardPayment("{PAYMENT_INTENT_CLIENT_SECRET}", {
          payment_method: {
            card,
            billing_details: {
              name: "Jenny Rosen",
            },
          },
        })
        .then(function (result) {
          // Handle result.error or result.paymentIntent
        });
      // console.info(res);
      toast.success("Payment SuccessFull", { id: toastId });
      handleModalClose();
    } catch (err) {
      toast.error(err, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  }
  // console.info(card);

  return (
    <Modal open={!!booking} onClose={handleModalClose} boxCSS={boxCSS}>
      <Wrapper onSubmit={handleSubmit}>
        <Heading>Payment</Heading>
        <Text>Product Name: {booking?.product[0]?.name}</Text>
        <Text>Selling Price: ${booking?.product[0]?.sellingPrice}</Text>
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
          <GradientButton
            name="reason"
            type="submit"
            style={{
              width: "100%",
              marginTop: "0.75rem",
            }}
            disabled={submitting || !clientSecret || !stripe}
            loading={submitting ? "true" : undefined}
          >
            Submit
          </GradientButton>
        </Form>
      </Wrapper>
    </Modal>
  );
}

export default PaymentModal;

const Wrapper = styled.div`
  width: 400px;
  min-height: 200px;
  padding: 1rem;
`;

const Form = styled.form``;

const Heading = styled.h2`
  font-weight: 500;
  margin-bottom: 1rem;
`;

const boxCSS = css`
  /* margin: var(--gip); */
  margin: 1rem;
`;

const Text = styled.p`
  line-height: 1.5rem;
`;

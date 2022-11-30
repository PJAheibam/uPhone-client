import React, { useState } from "react";
import styled, { css } from "styled-components";
import client from "../../api";
import { GradientButton } from "../../components/Button";
import { Input } from "../../components/formItems";
import Modal from "../../components/Modal";
import { toast } from "react-hot-toast";

function ReportModal({ product, user, setProduct, open, setOpen }) {
  const [submitting, setSubmitting] = useState(false);
  function handleModalClose() {
    setProduct(null);
    setOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const toastId = toast.loading("Submitting...");
    try {
      console.info(product._id, user.uid);
      if (!user?.uid) throw "Only loged in user can report";
      const res = client.post(`/reports`, {
        productId: product?._id,
        reporterId: user?.uid,
        reason: e.target[0].value,
      });
      toast.success("Report Submitted", { id: toastId });
    } catch (err) {
      toast.success(err, { id: toastId });
    }
  }

  return (
    <Modal open={!!open} onClose={handleModalClose} boxCSS={boxCSS}>
      <Wrapper onSubmit={handleSubmit}>
        <Heading>Report Reson</Heading>
        <Input as="textarea" rows={5} cols={50} required />
        <GradientButton
          name="reason"
          type="submit"
          style={{ width: "100%", marginTop: "0.75rem" }}
        >
          Submit
        </GradientButton>
      </Wrapper>
    </Modal>
  );
}

export default ReportModal;

const Wrapper = styled.form`
  max-width: 400px;
  min-height: 200px;
  padding: 1rem;
`;

const Heading = styled.h2`
  font-weight: 500;
  margin-bottom: 1rem;
`;

const boxCSS = css`
  /* margin: var(--gip); */
  margin: 1rem;
`;

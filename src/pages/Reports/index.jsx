import styled from "styled-components";
import { More, T, Table, Thumb, ThumbContainer } from "../../components/Table";
import useReportsData from "../../hooks/useReportsData";
import { useAuth } from "../../context/AuthContext";
import Tippy from "@tippyjs/react";
import { Button } from "../../components/Button";
import toast from "react-hot-toast";
import client from "../../api";

function Reports() {
  const { user } = useAuth();
  const { data = [], isLoading, refetch } = useReportsData(user?.uid);

  async function handleDelete(id, reportId) {
    const toastId = toast.loading("Deleting...");
    console.log("id", id);
    try {
      const deleteProduct = await client.delete(
        `/products?id=${id}&uid=${user?.uid}`
      );
      const deleteReport = await client.delete(
        `/reports?id=${reportId}&uid=${user?.uid}`
      );
      toast.success("Deleted", { id: toastId });
      refetch();
    } catch (error) {
      toast.error("error", { id: toastId });
    }
  }

  console.info(data);
  return (
    <Container>
      <Heading>Reports</Heading>
      <Table>
        <T.Head>
          <T.Row>
            <T.Heading>No</T.Heading>
            <T.Heading>Product</T.Heading>
            <T.Heading>Reporter</T.Heading>
            <T.Heading>Reason</T.Heading>
          </T.Row>
        </T.Head>
        <T.Body>
          {!isLoading &&
            data.map((report, i) => (
              <T.Row key={report._id}>
                <T.Data>{i + 1}</T.Data>
                <T.Data>
                  <ThumbContainer>
                    <Thumb
                      src={report?.product[0]?.images[0]?.display_url}
                      alt={report?.product[0]?.images[0]?.title}
                    />
                    {report?.product[0]?.name}
                  </ThumbContainer>
                </T.Data>
                <T.Data>{report?.reporter[0]?.fullName}</T.Data>
                <T.Data>
                  <Tippy content={report?.reason}>
                    <Reason>{report?.reason}</Reason>
                  </Tippy>
                </T.Data>
                <More>
                  <Button
                    variant="filled"
                    color="error"
                    style={{ fontSize: "0.9rem" }}
                    onClick={() => handleDelete(report?.productId, report._id)}
                  >
                    Delete
                  </Button>
                </More>
              </T.Row>
            ))}
        </T.Body>
      </Table>
    </Container>
  );
}

export default Reports;

const Container = styled.section``;

const Heading = styled.h1`
  font-weight: 500;
  font-size: clamp(1.25rem, 5vw, 2rem);
  margin-bottom: 1rem;
`;

const Reason = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

import React from "react";
import Skeleton from "react-loading-skeleton";
import styled, { useTheme } from "styled-components";
import { GradientButton } from "../../components/Button";
import { device } from "../../utils/breakpoints";
import userIcon from "../../assets/icons/user.png";
import { useQuery } from "@tanstack/react-query";
import client from "../../api";
import {
  MdVerified as VerifiedIcon,
  MdOutlineReportGmailerrorred as ReportIcon,
} from "react-icons/md";
import { PhotoView } from "react-photo-view";
import Tippy from "@tippyjs/react";
import { useNavigate } from "react-router-dom";

function Card({ data, setProduct, setOpenBookNow, setOpenReport, user }) {
  // console.info(data.sellerId);
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: seller, isLoading } = useQuery({
    queryKey: ["seller", data.sellerId],
    queryFn: async () => {
      const res = await client.get(`/users/${data.sellerId}`);
      return res.data;
    },
    refetchOnMount: true,
  });

  function handleBookNow() {
    if (!user || !user?.uid) navigate("/login");
    setProduct({ ...data, sellerInfo: seller });
    setOpenBookNow(true);
  }
  function handleReportClick() {
    if (!user || !user?.uid) navigate("/login");
    setProduct({ ...data, sellerInfo: seller });
    setOpenReport(true);
  }

  // console.info(seller);
  return (
    <Container>
      <Header>
        <PhotoView src={data?.images[0].display_url}>
          <Image src={data?.images[0].display_url} alt="title" />
        </PhotoView>
      </Header>
      <Body>
        <Content>
          <Name>{data?.name}</Name>
          <Text style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            ${data?.sellingPrice}
          </Text>
          <Text>
            <Property>Original Price: </Property>
            <Value>${data?.originalPrice}</Value>
          </Text>
          <Text>
            <Property>Location: </Property>
            <Value>{data?.location}</Value>
          </Text>
          <Text>
            <Property>Posted On: </Property>
            <Value>{`${data?.postedOn?.date} at ${data?.postedOn?.time}`}</Value>
          </Text>
        </Content>
        <Seller>
          {isLoading ? (
            <Skeleton circle height={40} width={40} />
          ) : (
            <SellerAvatar
              src={seller?.photoURL || userIcon}
              alt="Seller Avatar"
            />
          )}
          <SellerName>
            {seller?.fullName}
            {seller?.verified && (
              <VerifiedIcon color={`hsl(${theme.palette.info.main})`} />
            )}
          </SellerName>
        </Seller>
        <Tippy
          content="You can't book or report your own product"
          disabled={user?.email !== seller?.email}
          placement="bottom"
        >
          <Footer>
            <GradientButton
              style={{ borderRadius: "0.25rem" }}
              type="button"
              onClick={handleBookNow}
              disabled={seller?.email === user?.email}
            >
              Book
            </GradientButton>

            <Tippy content="Report This Product">
              <ReportButton
                onClick={handleReportClick}
                disabled={seller?.email === user?.email}
              >
                <ReportIcon />
              </ReportButton>
            </Tippy>
          </Footer>
        </Tippy>
      </Body>
    </Container>
  );
}

export default Card;

export function CardSkeleton() {
  return (
    <Container>
      <Header>
        <Skeleton height={150} />
      </Header>
      <Body>
        <Content>
          <Name>
            <Skeleton />
          </Name>
          <Text style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            <Skeleton />
          </Text>
          <Text>
            <Skeleton />
          </Text>
          <Text>
            <Skeleton />
          </Text>
          <Text>
            <Skeleton />
          </Text>
        </Content>
        <Seller>
          <Skeleton circle height={40} width={40} />

          <SellerName>
            <Skeleton width={80} height={20} />
          </SellerName>
        </Seller>
        <Footer>
          <Skeleton width={80} height={28} />
        </Footer>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  width: 100%;
  padding: 0.5rem;
  border-radius: var(--border-radius-lg);
  border: 1px solid hsl(var(--outline-variant) / 70%);
  background-image: var(--paper-1);
  @media ${device.sm} {
    /* max-width: 150px; */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: center;
`;

const Name = styled.h1`
  font-weight: 500;
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
`;

const Seller = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SellerName = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  gap: 0.15rem;
  justify-content: center;
`;

const SellerAvatar = styled.img`
  height: 40px;
  width: 40px;
  overflow: hidden;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;

const Property = styled.span``;

const Value = styled.span`
  color: hsl(var(--text-secondary));
`;

const Text = styled.p`
  line-height: 1.25rem;
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 0.15rem; */
`;

const Header = styled.div``;

const Body = styled.div`
  padding-top: 1rem;
  height: 100%;
  /* padding-bottom: 0.5rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Footer = styled.div`
  /* margin-top: auto; */
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div``;

const ReportButton = styled.button`
  padding: 0.25rem;
  font-size: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: hsl(var(--outline));
  &:hover {
    color: hsl(var(--error-main) / 80%);
  }
`;

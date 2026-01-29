import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2.5rem 1fr 7rem 9rem;
  gap: 2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guest = {}, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      
      <Flag style={{ gridColumn: 2 }}src={guest.nationalFlag || ""} alt={`Flag of ${guest.nationalID || "unknown"}`} />
      <Guest style={{ gridColumn: 3 }}>{guest.fullName || "Unknown guest"}</Guest>
      <div style={{ gridColumn: 4 }}>{numNights} nights</div>

      {console.log("TodayItem guest:", guest)}
      
      <div>{numNights ?? "?"} nights</div>

      {status === "unconfirmed" && (
        <Button
          style={{ gridColumn: 5 }}
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && (
        <div style={{ gridColumn: 5 }}>
          <CheckoutButton bookingId={id} />
        </div>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
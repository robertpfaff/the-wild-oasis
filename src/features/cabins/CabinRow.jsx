import styled from "styled-components";

const StyledCabinRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 2fr 2.2fr 1fr 1fr 1fr 0.5fr;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 2fr 1fr 0.5fr;
    
    .hide-mobile {
      display: none;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 0.375rem;
`;

const Cabin = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
`;

const Price = styled.div`
  font-weight: 600;
  color: #10b981;
`;

const Discount = styled.div`
  font-weight: 500;
  color: #f59e0b;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.375rem 0.75rem;
  background-color: ${(props) =>
    props.$variant === "edit" ? "#3b82f6" : props.$variant === "delete" ? "#ef4444" : "#6b7280"};
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$variant === "edit" ? "#2563eb" : props.$variant === "delete" ? "#dc2626" : "#4b5563"};
  }
`;

function CabinRow({ cabin, onEdit, onDelete }) {
  const { image, name, maxCapacity, regularPrice, discount, description } = cabin;

  return (
    <StyledCabinRow>
      <Img src={image} alt={name} />
      <Cabin>Cabin {name}</Cabin>
      <div className="hide-mobile">Fits up to {maxCapacity} guests</div>
      <Price>${regularPrice}</Price>
      <Discount className="hide-mobile">{discount ? `$${discount}` : "—"}</Discount>
      <div className="hide-mobile" style={{ fontSize: "0.875rem", color: "#6b7280" }}>
        {description ? description.substring(0, 50) + "..." : "No description"}
      </div>
      <ButtonGroup>
        <ActionButton $variant="edit" onClick={() => onEdit(cabin)}>
          Edit
        </ActionButton>
        <ActionButton $variant="delete" onClick={() => onDelete(cabin.id)}>
          Del
        </ActionButton>
      </ButtonGroup>
    </StyledCabinRow>
  );
}

export default CabinRow;

import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import CabinRow from "./CabinRow";
import EditCabinForm from "./EditCabinForm";
import { getCabins, updateCabin, deleteCabin } from "../../services/cabinService";
import { Modal, ModalContent, ModalHeader, Button } from "../../ui/StyledComponents";

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 2fr 2.2fr 1fr 1fr 1fr 0.5fr;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
  background-color: #f9fafb;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 2fr 1fr 0.5fr;
    
    .hide-mobile {
      display: none;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.125rem;
`;

function CabinTable() {
  const [cabins, setCabins] = useState(getCabins());
  const [editingCabin, setEditingCabin] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (cabin) => {
    setEditingCabin(cabin);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this cabin?")) {
      try {
        deleteCabin(id);
        setCabins(getCabins());
        toast.success("Cabin deleted successfully");
      } catch (err) {
        toast.error("Failed to delete cabin");
        console.error("Delete cabin error:", err);
      }
    }
  };

  const handleSubmit = (data) => {
    try {
      updateCabin(editingCabin.id, data);
      setCabins(getCabins());
      setShowModal(false);
      setEditingCabin(null);
      toast.success("Cabin updated successfully");
    } catch (err) {
      toast.error("Failed to update cabin");
      console.error("Update cabin error:", err);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingCabin(null);
  };

  if (cabins.length === 0) {
    return (
      <TableContainer>
        <EmptyState>No cabins found</EmptyState>
      </TableContainer>
    );
  }

  return (
    <>
      <TableContainer>
        <TableHeader>
          <div></div>
          <div>Cabin</div>
          <div className="hide-mobile">Capacity</div>
          <div>Price</div>
          <div className="hide-mobile">Discount</div>
          <div className="hide-mobile">Description</div>
          <div>Actions</div>
        </TableHeader>
        {cabins.map((cabin) => (
          <CabinRow
            key={cabin.id}
            cabin={cabin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </TableContainer>

      {showModal && (
        <Modal onClick={handleCancel}>
          <ModalContent onClick={(e) => e.stopPropagation()} maxWidth="700px">
            <ModalHeader>
              <h2>Edit Cabin</h2>
              <Button variant="secondary" size="small" onClick={handleCancel}>
                ✕
              </Button>
            </ModalHeader>
            <EditCabinForm
              cabin={editingCabin}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default CabinTable;

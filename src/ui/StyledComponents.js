import styled from "styled-components";

export const Button = styled.button`
  padding: ${(props) => (props.size === "small" ? "0.5rem 1rem" : "0.75rem 1.5rem")};
  background-color: ${(props) =>
    props.variant === "primary" ? "#3b82f6" : props.variant === "danger" ? "#ef4444" : "#6b7280"};
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: ${(props) => (props.size === "small" ? "0.875rem" : "1rem")};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary" ? "#2563eb" : props.variant === "danger" ? "#dc2626" : "#4b5563"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "200px 1fr"};
  gap: 1rem;
  align-items: ${(props) => props.align || "center"};
  padding: 1rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }

  label {
    font-weight: 500;
  }

  .error {
    color: #ef4444;
    font-size: 0.875rem;
    grid-column: 2;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Table = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr 1fr 1fr 1fr"};
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr 1fr 1fr 1fr"};
  gap: 1rem;
  padding: 1rem 1.5rem;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: ${(props) => props.maxWidth || "600px"};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

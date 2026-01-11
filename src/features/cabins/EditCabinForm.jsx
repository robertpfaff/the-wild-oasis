import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FormRow, Input, Textarea, Button, ModalActions } from "../../ui/StyledComponents";

const Form = styled.form`
  width: 100%;
`;

const Error = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;

function EditCabinForm({ cabin, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: cabin || {},
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <label htmlFor="name">Cabin name</label>
        <div>
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: "Cabin name is required",
            })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <label htmlFor="maxCapacity">Maximum capacity</label>
        <div>
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", {
              required: "Maximum capacity is required",
              min: {
                value: 1,
                message: "Capacity must be at least 1",
              },
            })}
          />
          {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <label htmlFor="regularPrice">Regular price</label>
        <div>
          <Input
            type="number"
            id="regularPrice"
            {...register("regularPrice", {
              required: "Regular price is required",
              min: {
                value: 1,
                message: "Price must be at least 1",
              },
            })}
          />
          {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <label htmlFor="discount">Discount</label>
        <div>
          <Input
            type="number"
            id="discount"
            {...register("discount", {
              min: {
                value: 0,
                message: "Discount cannot be negative",
              },
              validate: (value, formValues) => {
                const discountValue = value === "" || value === null || value === undefined ? 0 : Number(value);
                const priceValue = Number(formValues.regularPrice);
                return discountValue <= priceValue || "Discount should be less than or equal to regular price";
              },
            })}
          />
          {errors.discount && <Error>{errors.discount.message}</Error>}
        </div>
      </FormRow>

      <FormRow $align="start">
        <label htmlFor="description">Description</label>
        <div>
          <Textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && <Error>{errors.description.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <label htmlFor="image">Image URL</label>
        <div>
          <Input
            type="text"
            id="image"
            {...register("image", {
              required: "Image URL is required",
            })}
          />
          {errors.image && <Error>{errors.image.message}</Error>}
        </div>
      </FormRow>

      <ModalActions>
        <Button type="button" $variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" $variant="primary">
          {cabin ? "Update cabin" : "Create cabin"}
        </Button>
      </ModalActions>
    </Form>
  );
}

export default EditCabinForm;

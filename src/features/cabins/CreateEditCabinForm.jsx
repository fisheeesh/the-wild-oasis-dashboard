/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createCabinFormFields } from "../../utils/zSchema";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: isEditSession ? editValues : {},
    resolver: zodResolver(createCabinFormFields)
  })

  const { createCabin, isCreating } = useCreateCabin()
  const { editCabin, isEditing } = useEditCabin()

  const isWorking = isCreating || isEditing || isSubmitting

  const onCreateCabin = async (data) => {
    // await new Promise(resolve => setTimeout(resolve, 2000))
    if (isEditSession) {
      const newCabin = {
        name: data.name,
        maxCapacity: data.maxCapacity,
        regularPrice: data.regularPrice,
        discount: data.discount,
        description: data.description,
        image: data.editImage[0] ? data.editImage[0] : data.image
      }
      editCabin({ newCabinData: newCabin, id: editId }, {
        onSuccess: () => {
          onCloseModal?.()
          reset()
        }
      })
    }
    else {
      createCabin({ ...data, image: data.image[0] }, {
        onSuccess: () => {
          onCloseModal?.()
          reset()
        }
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onCreateCabin)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Cabin name" errorMessage={errors?.name?.message}>
        <Input disabled={isWorking} type="text" id="name" {...register('name')} />
      </FormRow>

      <FormRow label={'Max Capacity'} errorMessage={errors?.maxCapacity?.message}>
        <Input disabled={isWorking} type="number" id="maxCapacity" {...register("maxCapacity", { valueAsNumber: true })} />
      </FormRow>

      <FormRow label={'Regular price'} errorMessage={errors?.regularPrice?.message}>
        <Input disabled={isWorking} type="number" id="regularPrice" {...register('regularPrice', { valueAsNumber: true })} />
      </FormRow>

      <FormRow label={'Discount'} errorMessage={errors?.discount?.message}>
        <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register('discount', { valueAsNumber: true })} />
      </FormRow>

      <FormRow label={'Description'} errorMessage={errors?.description?.message}>
        <Textarea disabled={isWorking} type="number" id="description" defaultValue="" {...register('description')} />
      </FormRow>

      <FormRow label={'Cabin photo'} errorMessage={errors?.image?.message}>
        <FileInput disabled={isWorking} id="image" accept="image/*" {...register(isEditSession ? 'editImage' : 'image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onCloseModal?.()} disabled={isWorking} variation="secondary" type="reset">
          Cancel
        </Button>
        {isEditSession ? <Button disabled={isWorking}>{isWorking ? 'Editing...' : 'Edit cabin'}</Button> : <Button disabled={isWorking}>{isWorking ? 'Creating...' : 'Create new cabin'}</Button>}
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
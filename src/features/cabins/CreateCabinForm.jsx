import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCabinFormFields } from "../../utils/zSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createCabinFormFields)
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created.')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: err => toast.error(err.message)
  })

  const onCreateCabin = async (data) => {

    await new Promise(resolve => setTimeout(resolve, 2000))
    mutate({ ...data, image: data.image[0] })
  }

  return (
    <Form onSubmit={handleSubmit(onCreateCabin)}>
      <FormRow label="Cabin name" errorMessage={errors?.name?.message}>
        <Input disabled={isSubmitting} type="text" id="name" {...register('name')} />
      </FormRow>

      <FormRow label={'Max Capacity'} errorMessage={errors?.maxCapacity?.message}>
        <Input disabled={isSubmitting} type="number" id="maxCapacity" {...register("maxCapacity", { valueAsNumber: true })} />
      </FormRow>

      <FormRow label={'Regular price'} errorMessage={errors?.regularPrice?.message}>
        <Input disabled={isSubmitting} type="number" id="regularPrice" {...register('regularPrice', { valueAsNumber: true })} />
      </FormRow>

      <FormRow label={'Discount'} errorMessage={errors?.discount?.message}>
        <Input disabled={isSubmitting} type="number" id="discount" defaultValue={0} {...register('discount', { valueAsNumber: true })} />
      </FormRow>

      <FormRow label={'Description'} errorMessage={errors?.description?.message}>
        <Textarea disabled={isSubmitting} type="number" id="description" defaultValue="" {...register('description')} />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput disabled={isSubmitting} id="image" accept="image/*" {...register('image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isSubmitting} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

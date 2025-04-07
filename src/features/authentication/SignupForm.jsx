import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserFormFields } from "../../utils/zSchema";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      fullName: 'user',
      email: 'user@oasis.com',
      password: 'User1234$',
      passwordConfirm: 'User1234$'
    },
    resolver: zodResolver(createUserFormFields)
  })

  const isWorking = isSubmitting

  const onCreateNewUser = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onCreateNewUser)}>
      <FormRow label="Full name" errorMessage={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register('fullName')} />
      </FormRow>

      <FormRow label="Email address" errorMessage={errors?.email?.message}>
        <Input type="email" id="email" {...register('email')} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errorMessage={errors?.password?.message}>
        <Input type="password" id="password" {...register('password')} />
      </FormRow>

      <FormRow label="Repeat password" errorMessage={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register('passwordConfirm')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

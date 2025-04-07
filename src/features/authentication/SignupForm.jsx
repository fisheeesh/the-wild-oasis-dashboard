import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserFormFields } from "../../utils/zSchema";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    // defaultValues: {
    //   fullName: 'user',
    //   email: 'user@oasis.com',
    //   password: 'User1234$',
    //   passwordConfirm: 'User1234$'
    // },
    resolver: zodResolver(createUserFormFields)
  })

  const { signup, isSigningUp } = useSignup()

  const isWorking = isSubmitting || isSigningUp

  const onCreateNewUser = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    signup({ fullName: data.fullName, email: data.email, password: data.password }, {
      onSettled: () => {
        reset({
          fullName: '',
          email: '',
          password: '',
          passwordConfirm: ''
        })
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit(onCreateNewUser)}>
      <FormRow label="Full name" errorMessage={errors?.fullName?.message}>
        <Input disabled={isWorking} type="text" id="fullName" {...register('fullName')} />
      </FormRow>

      <FormRow label="Email address" errorMessage={errors?.email?.message}>
        <Input disabled={isWorking} type="email" id="email" {...register('email')} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errorMessage={errors?.password?.message}>
        <Input disabled={isWorking} type="password" id="password" {...register('password')} />
      </FormRow>

      <FormRow label="Repeat password" errorMessage={errors?.passwordConfirm?.message}>
        <Input disabled={isWorking} type="password" id="passwordConfirm" {...register('passwordConfirm')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking} onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {!isWorking ? 'Create new user' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

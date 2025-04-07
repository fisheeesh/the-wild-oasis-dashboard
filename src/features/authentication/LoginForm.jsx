import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormFields } from "../../utils/zSchema";
import useLogin from "./useLogin";
import SpinnerMini from '../../ui/SpinnerMini'

function LoginForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: 'user@oasis.com',
      password: 'User1234$'
    },
    resolver: zodResolver(loginFormFields)
  })

  const { login, loginLoading } = useLogin()

  const isWorking = isSubmitting || loginLoading

  async function onLoginUser(data) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    login({ email: data.email, password: data.password }, {
      onSettled: () => {
        reset({
          email: '',
          password: ''
        })
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit(onLoginUser)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isWorking}
          type="email"
          id="email"
          //? This makes this form better for password managers
          autoComplete="username"
          {...register('email')}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          disabled={isWorking}
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password')}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isWorking}>
          {!isWorking ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

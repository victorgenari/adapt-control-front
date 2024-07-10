import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSignIn } from '~/hooks'

import { pageTitle } from '~/utils'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { Title, Label, TextField, FormHelper, Bounce, Button } from '~/components'

import {
  Container,
  Form,
  TextFieldGroup,
  ShowPasswordBtn,
  ForgotPasswordBox
} from './styles'

export const SignIn = () => {
  pageTitle('Entrar')
  const { signIn, onSubmit, handleSubmit, register, formState: { errors } } = useSignIn()

  const [passwordState, setPasswordState] = useState(false)
  const handleShowPassword = () => setPasswordState(prevState => !prevState)

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title content='Login' />

        <TextFieldGroup>
          <Label htmlFor='user_code' content='Matrícula:' />
          <TextField
            type='number'
            placeholder='Sua matrícula'
            register={register('user_code')}
            id='user_code'
            error={(errors.user_code != null)}
          />
          {(errors.user_code != null) && <FormHelper content={`${errors.user_code.message}`} />}
        </TextFieldGroup>

        <TextFieldGroup>
          <Label htmlFor='password' content='Senha:' />
          <TextField
            type={passwordState ? 'text' : 'password'}
            placeholder='Sua senha'
            register={register('password')}
            id='password'
            {...(errors.password != null && { error: true })}
            children={<ShowPasswordBtn type='button' onClick={handleShowPassword}>{passwordState ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</ShowPasswordBtn>}
          />
          {(errors.password != null) && <FormHelper content={`${errors.password.message}`} />}
        </TextFieldGroup>

        <Button
          type='submit'
          disabled={signIn.isLoading}
          buttonContent={signIn.isLoading ? <Bounce bgColor='white' /> : 'Entrar'}
        />

        <ForgotPasswordBox>
          <p>Esqueceu sua senha? <Link to={`/solicitacao/reset-de-senha`}>Clique aqui</Link></p>
        </ForgotPasswordBox>
      </Form>
    </Container>
  )
}
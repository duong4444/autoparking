'use client';
import { useFormLogin } from '@autospace/forms/src/login';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { Button } from '../atoms/Button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export interface ILoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: ILoginFormProps) => {
  // register: connect input field to rhf , to track the value,validation
  // handleSubmit: func wraps submit handler
  // formState:{errors} obj containing validations errors for each field
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin();

  const { replace } = useRouter();

  console.log('err in login form: ', errors);

  return (
    <Form
      // data từ rhf lấy giá trị từ các input trong form(dựa vào thuộc tính name của từng input)
      onSubmit={handleSubmit(async (data) => {
        console.log('data trong loginForm', data);
        const { email, password } = data;
        console.log("email trong loginForm",email);
        console.log("pwd trong loginForm",password);
        
        
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        console.log("result trong loginForm: ",result);
        

        if (result?.ok) {
          replace('/');
        }

        if(result?.error){
          alert('login failed!')
        }
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput {...register('email')} placeholder="Email" className='text-black' />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          {...register('password')}
          placeholder="Password"
          type="password"
          className='text-black'
        />
      </HtmlLabel>
      <Button type="submit">Submit</Button>
      <div className="mt-4 text-sm">
        Do not have an autoparking account?
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Create one
        </Link>{' '}
        now.
      </div>
    </Form>
  );
};

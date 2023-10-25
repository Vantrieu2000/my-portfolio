'use client';

import { checkEmailExistAPI, userLoginAPI } from '@/lib/client-api/userApi';
import InputField from '@/lib/components/common/InputField';
import { Validate } from '@/lib/variables/validator';
import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { OAuth } from './OAuth';

export default function SignInForm() {
    const session = useSession();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data: any) => {
        switch (step) {
            case 1: {
                setLoading(true);
                const response = await checkEmailExistAPI(data.email);
                if (response.success) {
                    if (response.data?.exist) {
                        setStep(2);
                    } else {
                        setError('email', { type: 'server', message: 'Email does not exist' });
                    }
                }
                setLoading(false);
                break;
            }
            case 2: {
                setLoading(true);
                const response = await userLoginAPI({ email: data.email, password: data.password });
                if (response.success) {
                    /// Technically a double login call but this is required to workaround NextAuth redirect when API return errors
                    await signIn('credentials', {
                        email: data.email,
                        password: data.password,
                        redirect: true,
                        callbackUrl: '/',
                    });
                } else {
                    setError('password', { type: 'server', message: response.message });
                }
                setLoading(false);
                break;
            }
            default:
                break;
        }
    };

    return (
        <Fragment>
            <div className="auth__title__container">
                <div className="auth__title">
                    <span className="auth__title--main">Sign in</span>
                    <Link href="/sign-up">I don't have an account</Link>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    hookRegister={register('email', Validate.EMAIL)}
                    label="Email address"
                    inputProps={{
                        type: 'text',
                        placeholder: 'name@email.com',
                    }}
                    error={errors?.email?.message as string}
                />
                {step === 2 && (
                    <InputField
                        hookRegister={register('password', Validate.PASSWORD)}
                        label="Password"
                        inputProps={{
                            type: 'password',
                        }}
                        error={errors?.password?.message as string}
                    />
                )}
                <button type="submit" className={clsx('button button__primary--large', loading && 'button__loading')} disabled={loading}>
                    Submit
                </button>
            </form>
            <OAuth />
        </Fragment>
    );
}

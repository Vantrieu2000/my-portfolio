'use client';

import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/lib/components/common/InputField';
import { OAuth } from './OAuth';
import { SignUpFlow } from '@/lib/types/components/auth';
import CheckboxField from '../common/CheckboxField';
import SelectField from '../common/SelectField';
import { authStore } from '@/lib/stores/auth';
import { Validate } from '@/lib/variables/validator';
import { checkEmailExistAPI, registerUserAPI } from '@/lib/client-api/userApi';
import Link from 'next/link';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';

export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const { setTestimonyMode } = authStore();
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        unregister,
        setError,
        watch,
        formState: { errors },
    } = useForm();

    function moveStep(direction: 1 | -1) {
        /// Move current step by (direction) step and minimum is 1 and maximum is the last highest step of the flow
        const newStep = Math.max(Math.min(step + direction, Math.max(...Object.keys(flow).map((key) => Number(key)))), 1);
        setStep(newStep);
        setTestimonyMode(newStep === 1 ? 'testimony' : 'rating');
    }

    useEffect(() => {
        return () => {
            setTestimonyMode('testimony');
        };
    }, []);

    const onSubmit = async (data: any) => {
        switch (step) {
            case 1: {
                setLoading(true);
                const response = await checkEmailExistAPI(data.email);
                if (response.success) {
                    if (response.data?.exist) {
                        setError('email', { type: 'server', message: 'Email is already exist' });
                    } else {
                        moveStep(1);
                    }
                }
                setLoading(false);
                break;
            }
            case 2: {
                setLoading(true);
                const response = await registerUserAPI(data);
                if (response.success) {
                    await signIn('credentials', {
                        email: data.email,
                        password: data.password,
                        redirect: true,
                        callbackUrl: '/',
                    });
                }
                setLoading(false);
                break;
            }
            default:
                break;
        }
    };

    const flow: SignUpFlow = {
        1: {
            title: `Sign up free\nfor TenderRelief`,
            submit: `Get started free`,
            subTitle: null,
            action: null,
            inputs: [
                {
                    InputComponent: InputField,
                    props: {
                        hookRegister: register('email', step !== 1 ? {} : Validate.EMAIL),
                        label: 'Email address',
                        inputProps: {
                            type: 'text',
                            placeholder: 'name@email.com',
                            autoComplete: 'new-password',
                        },
                        error: errors?.email?.message as string,
                    },
                },
            ],
        },
        2: {
            title: `Sign up to TenderRelief`,
            submit: `Get started free`,
            subTitle: `Let’s set up an account`,
            action: {
                title: `Back to previous step`,
                fn: () => {
                    unregister(['first_name', 'last_name', 'password'], { keepValue: true });
                    moveStep(-1);
                },
            },
            inputs: [
                {
                    InputComponent: InputField,
                    props: {
                        hookRegister: register('first_name', step !== 2 ? {} : Validate.FIRST_NAME),
                        label: 'First name',
                        inputProps: {
                            type: 'text',
                            autoComplete: 'new-password',
                        },
                        error: errors?.first_name?.message as string,
                    },
                },
                {
                    InputComponent: InputField,
                    props: {
                        hookRegister: register('last_name', step !== 2 ? {} : Validate.LAST_NAME),
                        label: 'Last name',
                        inputProps: {
                            type: 'text',
                            autoComplete: 'new-password',
                        },
                        error: errors?.last_name?.message as string,
                    },
                },
                {
                    InputComponent: InputField,
                    props: {
                        hookRegister: register('password', step !== 2 ? {} : Validate.PASSWORD),
                        label: 'Password',
                        inputProps: {
                            type: 'password',
                            autoComplete: 'new-password',
                        },
                        error: errors?.password?.message as string,
                    },
                },
                {
                    InputComponent: CheckboxField,
                    props: {
                        hookRegister: register('subscribe'),
                        label: 'Send me product updates and marketing communications. Unsubscribe anytime.',
                        inputProps: {
                            id: 'subscribe',
                        },
                    },
                },
            ],
        },
    };

    return (
        <Fragment>
            <div className="auth__title__container">
                {!!flow[step]?.action && (
                    <span className="auth__title--action" onClick={() => flow[step].action!.fn()}>
                        {flow[step].action!.title}
                    </span>
                )}
                <div className="auth__title">
                    <span className="auth__title--main">{flow[step]?.title}</span>
                </div>
                {!!flow[step]?.subTitle && <span className="auth__title--sub">{flow[step].subTitle}</span>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {(flow[step]?.inputs || []).map(({ InputComponent, props }, index) => (
                    <InputComponent {...props} key={step + '-' + index} />
                ))}
                <button type="submit" className={clsx('button button__primary--large', loading && 'button__loading')} disabled={loading}>
                    {flow[step]?.submit}
                </button>
            </form>
            {step === 1 && (
                <Fragment>
                    <OAuth />
                    <div className="auth__agreement">
                        Already have an account? <Link href="/sign-in">Log in</Link>
                    </div>
                </Fragment>
            )}
            {step === 2 && (
                <div className="auth__agreement">
                    By clicking Sign Up you are creating a TenderRelief account, and agree to TenderRelief{' '}
                    <a href="/">Terms & Conditions</a> and <a href="/">Privacy Policy</a>
                </div>
            )}
        </Fragment>
    );
}

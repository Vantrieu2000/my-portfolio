'use client';

import InputField from '@/lib/components/common/InputField';
import { authStore } from '@/lib/stores/auth';
import { SignUpFlow } from '@/lib/types/components/auth';
import clsx from 'clsx';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectField from '../common/SelectField';
import { Validate } from '@/lib/variables/validator';
import { updateUserRegisterDetailsAPI } from '@/lib/client-api/userApi';
import { signIn, useSession } from 'next-auth/react';
import { BUSINESS_ROLE, INDUSTRY, ORGANISATION_SCALE, UserStatus } from '@/lib/variables/constants';
import { redirect, useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu';
import Icon from '@/lib/components/common/Icon';
import { PHONE_CODES } from '@/lib/variables/phone-codes';

export default function TellUsMoreForm() {
    const [loading, setLoading] = useState(false);
    const { setTestimonyMode } = authStore();
    const [step, setStep] = useState(1);
    const [phoneCode, setPhoneCode] = useState('+61');
    const router = useRouter();
    const { update } = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setTestimonyMode('rating');
    }, []);

    const onSubmit = async (data: any) => {
        setLoading(true);
        const response = await updateUserRegisterDetailsAPI({ ...data, phone_area_code: phoneCode });
        if (response.success) {
            await update({ account_status: UserStatus.ACTIVE });
            router.replace('/');
        }
        setLoading(false);
    };

    const flow: SignUpFlow = {
        1: {
            title: `Tell us a bit about yourself`,
            submit: `Join now`,
            subTitle: `So we can customise your experience`,
            action: null,
            inputs: [
                {
                    InputComponent: InputField,
                    props: {
                        hookRegister: register('phone_number', Validate.PHONE_NUMBER),
                        label: 'Phone number',
                        inputProps: {
                            type: 'text',
                            autoComplete: 'new-password',
                        },
                        prefix: (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-[40px]">{phoneCode}</DropdownMenuTrigger>
                                <DropdownMenuContent className="max-h-[200px] w-[350px] overflow-y-auto">
                                    {PHONE_CODES.map(({ name, dial_code }) => (
                                        <DropdownMenuItem className="flex justify-between" onClick={() => setPhoneCode(dial_code)} key={name}>
                                            <span>{name}</span> <span>{dial_code}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ),
                        error: errors?.phone_number?.message as string,
                    },
                },
                {
                    InputComponent: SelectField,
                    props: {
                        hookRegister: register('industry', Validate.INDUSTRY),
                        label: 'What is your industry?',
                        options: INDUSTRY.map((field) => ({
                            value: field,
                            label: field,
                        })),
                        error: errors?.industry?.message as string,
                    },
                },
                {
                    InputComponent: SelectField,
                    props: {
                        hookRegister: register('role', Validate.BUSINESS_ROLE),
                        label: 'What is your role?',
                        options: BUSINESS_ROLE.map((field) => ({
                            value: field,
                            label: field,
                        })),
                        error: errors?.role?.message as string,
                    },
                },
                {
                    InputComponent: SelectField,
                    props: {
                        hookRegister: register('organisation', Validate.ORGANISATION),
                        label: 'How would you describe your organisation?',
                        options: ORGANISATION_SCALE.map((field) => ({
                            value: field,
                            label: field,
                        })),
                        error: errors?.organisation?.message as string,
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
        </Fragment>
    );
}

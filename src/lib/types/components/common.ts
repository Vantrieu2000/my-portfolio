import Icon from '@/lib/components/common/Icon';
import { JSXChildren } from '@/lib/types/common';
import { ComponentType, HTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type InputFieldType = {
    hookRegister: UseFormRegisterReturn;
    inputProps?: any;
    label?: string;
    error?: string;
    Icon?: ComponentType;
    optional?: boolean;
    prefix?: JSXChildren;
    suffix?: JSXChildren;
    onIconClick?: VoidFunction;
};

export type SelectFieldType = {
    hookRegister: UseFormRegisterReturn;
    inputProps?: any;
    label?: string;
    error?: string;
    options: { value: any; label: string }[];
};

export type CheckboxFieldType = {
    hookRegister: UseFormRegisterReturn | {};
    inputProps: {
        id: string;
        [key: string]: any;
    };
    label?: string;
    error?: string;
};

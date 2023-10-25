import { CheckboxFieldType, InputFieldType, SelectFieldType } from './common';

export type SignUpFlow = {
    [key: number]: {
        title: string;
        submit: string;
        subTitle: string | null;
        action: {
            title: string;
            fn: Function;
        } | null;
        inputs: {
            InputComponent: (props: any) => JSX.Element;
            props: InputFieldType | SelectFieldType | CheckboxFieldType;
        }[];
    };
};

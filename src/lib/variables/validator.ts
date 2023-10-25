import { EMAIL_REGEX } from './regex';

export const Validate = {
    REQUIRED: {
        required: { value: true, message: 'You must enter this field' },
    },
    EMAIL: {
        required: { value: true, message: 'You must enter email address' },
        pattern: { value: EMAIL_REGEX, message: 'Invalid email' },
    },
    FIRST_NAME: { required: { value: true, message: 'You must enter first name' } },
    LAST_NAME: { required: { value: true, message: 'You must enter last name' } },
    PASSWORD: { required: { value: true, message: 'You must enter password' } },
    PHONE_NUMBER: {
        required: { value: true, message: 'You must enter phone number' },
        pattern: {
            value: /^[0-9]{9,15}$/,
            message: 'Invalid phone number',
        },
    },
    INDUSTRY: { required: { value: true, message: 'You must enter your industry' } },
    BUSINESS_ROLE: { required: { value: true, message: 'You must enter your role' } },
    ORGANISATION: { required: { value: true, message: 'You must describe your organisation' } },

    GROUP_NAME: {
        required: { value: true, message: 'You must enter this field' },
        maxLength: { value: 60, message: 'Maximum length of group name is 60 characters' },
    },
};

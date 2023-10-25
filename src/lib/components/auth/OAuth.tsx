'use client';
import { Fragment } from 'react';
import Icon from '../common/Icon';
import { signIn } from 'next-auth/react';

export const OAuth = () => {
    return (
        <Fragment>
            <div className="divider">Or continue with</div>
            <div className="auth__oauth-actions">
                <button
                    className="button button__icon"
                    onClick={() => {
                        signIn('google');
                    }}
                >
                    <Icon.Google />
                </button>
                <button
                    className="button button__icon"
                    onClick={() => {
                        signIn('facebook');
                    }}
                >
                    <Icon.Facebook />
                </button>
                <button
                    className="button button__icon"
                    onClick={() => {
                        signIn('twitter');
                    }}
                >
                    <Icon.Twitter />
                </button>
            </div>
        </Fragment>
    );
};

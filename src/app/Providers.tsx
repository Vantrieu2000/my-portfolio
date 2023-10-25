'use client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}
function Providers({ children }: Props) {
    dayjs.extend(relativeTime);

    return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;

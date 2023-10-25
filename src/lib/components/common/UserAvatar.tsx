'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import placeholderAvatar from '@/assets/avatar-placeholder.png';

export const UserAvatar = ({ src }: { src: string }) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [src]);

    if (error) return <Image alt={''} width={48} height={48} className="user-image" src={placeholderAvatar as unknown as string} loading="lazy" />; //Just a typescript bypass

    return <Image alt={''} width={48} height={48} className="user-image" onError={() => setError(true)} src={src} loading="lazy" />;
};

'use client';

import { AppstoreOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, Input, Menu, MenuProps, Space } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
const { Search } = Input;

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    const onSearch = (value: string) => console.log(value);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Tranh Thuận Buồm Xuôi Gió
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Tranh Thuận Buồm Xuôi Gió
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Tranh Thuận Buồm Xuôi Gió
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Tranh Thuận Buồm Xuôi Gió
                </a>
            ),
        },
        {
            key: '5',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Tranh Thuận Buồm Xuôi Gió
                </a>
            ),
        },
        {
            key: '6',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Tranh Thuận Buồm Xuôi Gió
                </a>
            ),
        },
    ];

    const menuItem = [
        {
            label: 'TRANG CHỦ',
            key: 'home-page',
        },
        {
            label: 'GIỚI THIỆU',
            key: 'about-us',
        },
        {
            label: 'SẢN PHẨM',
            key: 'product',
        },
        {
            label: 'TIN TỨC',
            key: 'news',
        },
        {
            label: 'BẢO HÀNH',
            key: 'guarantee',
        },
        {
            label: 'LIÊN HỆ',
            key: 'contact',
        },
    ];

    const onClickMenu = (e: any) => {
        router.push(`/${e.key}`);
    };

    try {
        return (
            <Fragment>
                <div className="header"></div>
            </Fragment>
        );
    } catch {
        return <></>;
    }
}

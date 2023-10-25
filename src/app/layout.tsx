import { RootStyleRegistry } from '@/lib/components/root-style-registry';
import { metaBuilder } from '@/lib/functions/common';
import AntdDefaultThemeConfigs from '@/lib/variables/antd-defaults';
import '@/styles/styles.scss';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Providers from './Providers';
import './globals.css';
import { AOSInit } from '@/lib/components/common/Aos';
dayjs.extend(relativeTime);

const inter = Roboto({
    subsets: ['latin'],
    weight: '500',
});

export const metadata: Metadata = metaBuilder();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <body className={`${inter.className} `}>
                <AOSInit />
                <ConfigProvider theme={AntdDefaultThemeConfigs}>
                    <Providers>
                        <RootStyleRegistry>{children}</RootStyleRegistry>
                    </Providers>
                </ConfigProvider>
                <div id="modal-root"></div>
            </body>
        </html>
    );
}

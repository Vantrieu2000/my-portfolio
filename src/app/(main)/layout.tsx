import { Suspense } from 'react';
import Loading from './loading';
import Header from '@/lib/components/layout/header';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<Loading />}>
            <section className="main-app">
                <Header />
                {children}
            </section>
        </Suspense>
    );
}

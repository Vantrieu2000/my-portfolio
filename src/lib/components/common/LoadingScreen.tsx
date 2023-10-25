import { Spin } from 'antd';
import clsx from 'clsx';

export default function LoadingScreen({ main }: { main?: boolean }) {
    return (
        <div className={clsx(main ? 'loading-overlay--main' : 'loading-overlay')}>
            <Spin />
        </div>
    );
}

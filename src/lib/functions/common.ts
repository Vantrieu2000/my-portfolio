import { Metadata } from 'next';
import { MetadataOptions } from '../types/common';

export function metaBuilder(metadataOptions?: MetadataOptions): Metadata {
    const { title, description, image } = metadataOptions || {};
    return {
        title: title ?? 'My Portfolio',
        description: description ?? 'My Portfolio',
        openGraph: {
            title: title ?? 'My Portfolio',
            description: description ?? 'My Portfolio',
            images: [image ?? '/static/opengraph.png'],
        },
    };
}

// export const useViewport = () => {
//     const [width, setWidth] = React.useState(window.innerWidth);

//     React.useEffect(() => {
//         const handleWindowResize = () => setWidth(window.innerWidth);
//         window.addEventListener('resize', handleWindowResize);
//         return () => window.removeEventListener('resize', handleWindowResize);
//     }, []);

//     // Return the width so we can use it in our components
//     return { width, isSP: width <= 768, isTablet: width > 768 && width <= 1199, isPC: width > 1199 };
// };

export function createMap(keyName: string, items: any[], fieldName?: string, lastValue?: boolean): any {
    const map: any = {};

    items.forEach((item: any) => {
        const key = map[item[keyName]];
        if (key) {
            if (lastValue) {
                map[item[keyName]] = fieldName ? item[fieldName] : item;
            } else {
                map[item[keyName]].push(fieldName ? item[fieldName] : item);
            }
        } else {
            if (lastValue) {
                map[item[keyName]] = fieldName ? item[fieldName] : item;
            } else {
                map[item[keyName]] = [fieldName ? item[fieldName] : item];
            }
        }
    });

    return map;
}

export function styleBuilder(
    styles: {
        readonly [key: string]: string;
    },
    ...classNames: (string | null | undefined)[]
) {
    return classNames
        .map((cls) => {
            if (!cls) return '';
            return styles[cls];
        })
        .join(' ');
}

export function between(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
}

export function toCamelCase(s: string) {
    // split and uppercase `snake_case`, `kebab-case`, and `spaced keys`
    const updated = s
        .split(/[-_\s]/)
        .map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
        .join('');

    // ensure the final string starts lowercase
    return `${updated.charAt(0).toLowerCase()}${updated.slice(1)}`;
}

export function toTitleCase(s: string) {
    const words = s.split(/(?=[A-Z])/);
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}

export const toKebabCase = (s: string) => {
    return s
        .toLowerCase()
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join('-');
};

export const isActivePath = (currentPathname: string, pathname: string | string[], comparer?: '=' | 'in'): boolean => {
    comparer ??= Array.isArray(pathname) ? 'in' : '=';
    switch (comparer) {
        case '=':
            return currentPathname === pathname;
        case 'in':
            if (Array.isArray(pathname)) return pathname.includes(currentPathname);
            return currentPathname.includes(pathname);
        default:
            return currentPathname === pathname;
    }
};

export function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

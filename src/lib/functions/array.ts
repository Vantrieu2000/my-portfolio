import { GenericObject } from '../types/common';
import { isSameValue } from './object';

export function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    const length = array.length;

    for (let i = 0; i < length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunks.push(chunk);
    }

    return chunks;
}

export function distinct<T>(arr: T[]) {
    return arr.filter((v, i, a) => a.findIndex((x) => isSameValue(x, v)) === i);
}

export function distinctByProperty(arr: { [key: string]: any }[], property = 'id') {
    const result = [];
    const map = new Map();
    for (const i of arr) {
        if (!map.has(i[property])) {
            map.set(i[property], true);
            result.push(i);
        }
    }

    return result;
}

export function distinctByProperties(arr: GenericObject[], properties = ['id']) {
    const result = [];
    const map = new Map();
    for (const i of arr) {
        const mapKey = properties.map((property) => `${property}:(${i[property]})`).join('|||');
        if (!map.has(mapKey)) {
            map.set(mapKey, true);
            result.push(i);
        }
    }

    return result;
}

export function distinctByValue<T>(arr: T[], valueFunc: Function) {
    const result = [];
    const map = new Map();
    for (const i of arr) {
        const uniqueValue = valueFunc(i);
        if (!map.has(uniqueValue)) {
            map.set(uniqueValue, true);
            result.push(i);
        }
    }

    return result;
}

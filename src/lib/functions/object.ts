import { GenericObject } from '../types/common';

// deep value-equality check
export function isSameValue(left: any, right: any): boolean {
    'use strict';

    // eliminate null-null or undefined-undefined
    if (left === null || left === undefined || right === null || right === undefined) {
        return left === right;
    }

    // eliminate type mismatches
    if (left.constructor !== right.constructor) return false;

    // functions and regexes can be compared directly
    if (left instanceof Function || left instanceof RegExp) return left === right;

    // check simple equality case
    if (left === right || left.valueOf() === right.valueOf()) return true;

    // if they're (supposed to be) equal dates, they would have passed the simple equality check
    if (left instanceof Date) return false;

    // if they're arrays, compare the lengths
    if (Array.isArray(left) && left.length !== right.length) return false;

    // assert we're dealing with objects moving forward so that we can recurse the keys
    if (!(left instanceof Object) || !(right instanceof Object)) return false;

    // recurse on keys
    const firstKeys = Object.keys(left);
    const allKeysExist = Object.keys(right).every((i) => firstKeys.indexOf(i) !== -1);
    const allKeyValuesMatch = firstKeys.every((i) => isSameValue(left[i], right[i]));

    return allKeysExist && allKeyValuesMatch;
}

export function toPureObject<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function isEmail(value) {
    return value.includes('@');
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

export function hasMaxLength(value, maxLength) {
    return value.length <= maxLength;
}

export function isEqualToOtherValue(value, otherValue) {
    // console.log(value, otherValue);
    return value === otherValue;
}
// 6位数字
export const phoneRegex = /^\d{6}$/;

// 该位置后面不全是数字
export const notOnlyNum = /(?![0-9]+$)/;

// 只能包含 字母 中文 数字 下划线 减号 1到20位
export const userRegex = /^[a-zA-Z\u4e00-\u9fa50-9_-]{1,20}$/;

// 必须包含 字母 数字 至少8位
export const LetterNumRegex = /^(?![a-zA-Z]+$)(?![0-9]+$)[a-zA-Z0-9]{8,}$/;

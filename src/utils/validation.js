export const emailValidation = {
    required: '請輸入您的電子郵件',
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Email 格式不正確',
    },
};

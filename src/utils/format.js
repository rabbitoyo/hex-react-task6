// 價格千分位處理
export const formatNumber = (num) => {
    // 安全性檢查：如果 num 是 undefined 或 null，回傳 0 或空字串
    if (num === undefined || num === null) return '0';

    const n = Number(num) || 0;
    return n.toLocaleString();
};

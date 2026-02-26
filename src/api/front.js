import { frontApi } from './auth';

// 取得產品
export const getProductsApi = (page = '') => {
    // 如果有 page 則帶入 query，沒有則空字串
    const url = page ? `products?page=${page}` : `products`;
    return frontApi.get(url);
};

// 取得單一產品
export const getProductDetailApi = (id) => frontApi.get(`product/${id}`);

// 加入購物車
export const addCartApi = (data) => frontApi.post('cart', { data });

// 取得購物車
export const getCartApi = () => frontApi.get('cart');

// 更新購物車
export const updateCartApi = (id, data) => frontApi.put(`cart/${id}`, { data });

// 刪除單一品項購物車
export const deleteCartApi = (id) => frontApi.delete(`cart/${id}`);

// 刪除所有品項購物車
export const deleteCartAllApi = () => frontApi.delete('carts');

// 送出訂單
export const submitOrderApi = (data) => frontApi.post('order', { data });

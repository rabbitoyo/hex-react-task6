import { useCart } from '../../context/useCart';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

// utils
import { getErrorMessage, formatNumber, emailValidation } from '../../utils';

// Components
import ProductLoading from '../../components/common/ProductLoading';

// Api
import { submitOrderApi } from '../../api/front';

const Order = () => {
    const { cart, getCart, isLoading, isFirstRender } = useCart();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const onSubmit = async (formData) => {
        try {
            const res = await submitOrderApi({
                user: formData,
                message: formData.message,
            });
            alert(`${res?.data?.message || '訂單提交成功'}!`);
            getCart(true);
            navigate('/', { replace: true });
        } catch (error) {
            alert(`API 錯誤：${getErrorMessage(error)}!`);
        }
    };

    // 檢查購物車是否有資料，沒有則導回購物車頁面
    useEffect(() => {
        if (!isFirstRender && cart.carts.length === 0) {
            navigate('/cart', { replace: true });
        }
    }, [isFirstRender, cart.carts.length, navigate]);

    if (isFirstRender) return null;

    return (
        <>
            <section className="cart py-10 py-sm-15">
                <div className="container">
                    <h2 className="fs-7 fs-lg-4 fw-bold text-dark text-center text-lg-start mt-12 mt-sm-17 mb-6 mb-sm-12">
                        填寫旅客資料
                    </h2>

                    {/* 只有正在 Loading 且畫面清單有東西時才顯示 Loading 組件 */}
                    {isLoading && cart.carts.length > 0 && <ProductLoading />}

                    <div
                        className={`row flex-xl-nowrap row-gap-6 g-xl-15 ${isLoading ? 'd-none' : 'isLoaded'}`}
                    >
                        <div className="col-xl-8">
                            <div className="bg-white rounded-4 border p-5 p-lg-8">
                                <form id="orderForm" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <div className="row g-6">
                                            <div className="col-md-6">
                                                <label htmlFor="name" className="form-label">
                                                    姓名
                                                </label>
                                                {errors.name && (
                                                    <span className="text-danger small ms-2">
                                                        ({errors.name.message})
                                                    </span>
                                                )}
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="請輸入您的姓名"
                                                    defaultValue="Rabbit"
                                                    {...register('name', {
                                                        required: '請輸入您的姓名',
                                                        minLength: {
                                                            value: 2,
                                                            message: '姓名至少 2 個字',
                                                        },
                                                    })}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email" className="form-label">
                                                    電子郵件
                                                </label>
                                                {errors.email && (
                                                    <span className="text-danger small ms-2">
                                                        ({errors.email.message})
                                                    </span>
                                                )}
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="請輸入您的電子郵件"
                                                    defaultValue="example@gmail.com"
                                                    {...register('email', emailValidation)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tel" className="form-label">
                                            聯絡電話
                                        </label>
                                        {errors.tel && (
                                            <span className="text-danger small ms-2">
                                                ({errors.tel.message})
                                            </span>
                                        )}
                                        <input
                                            type="tel"
                                            id="tel"
                                            name="tel"
                                            className="form-control"
                                            placeholder="請輸入您的聯絡電話"
                                            defaultValue="0912345678"
                                            {...register('tel', {
                                                required: '請輸入您的聯絡電話',
                                                minLength: { value: 8, message: '電話至少 8 碼' },
                                                pattern: {
                                                    value: /^\d+$/,
                                                    message: '電話僅能輸入數字',
                                                },
                                            })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">
                                            通訊地址
                                        </label>
                                        {errors.address && (
                                            <span className="text-danger small ms-2">
                                                ({errors.address.message})
                                            </span>
                                        )}
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            className="form-control"
                                            placeholder="請輸入您的通訊地址"
                                            defaultValue="台北市信義區松仁路100號"
                                            {...register('address', {
                                                required: '請輸入您的通訊地址',
                                            })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">
                                            特殊需求
                                        </label>
                                        <textarea
                                            type="text"
                                            id="message"
                                            className="form-control"
                                            placeholder="例如：需要嬰兒推車、攜帶寵物等特殊需求，請在此說明"
                                            cols="30"
                                            rows="10"
                                            {...register('message')}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            {cart.carts.length > 0 && (
                                <div className="cartPrice bg-white w-100 rounded-4 border p-5 p-lg-8 mb-5">
                                    <div className="d-flex flex-column row-gap-6 border-bottom mb-4 pb-6">
                                        <p className="fs-9 fs-lg-8 fw-bold">訂單摘要</p>
                                        <div className="d-flex flex-column row-gap-3">
                                            <p className="d-flex justify-content-between  fw-bold font-montserrat">
                                                <span className="text-muted">小計</span>
                                                <span>$ {formatNumber(cart.total)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="d-flex justify-content-between fs-9 fs-sm-7 fw-bold font-montserrat mb-7">
                                        <span>總計</span>
                                        <span>$ {formatNumber(cart.final_total)}</span>
                                    </p>
                                    <div className="d-flex flex-column gap-2">
                                        <button
                                            type="submit"
                                            form="orderForm"
                                            className="btn btn-primary w-100 py-4 fs-10 fw-bold"
                                        >
                                            前往結帳
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-light w-100 py-4 fs-10 fw-bold"
                                            onClick={() => navigate('/cart')}
                                        >
                                            返回訂單
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Order;

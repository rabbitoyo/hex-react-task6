import { useCart } from '../../context/useCart';
import { useNavigate, Link } from 'react-router';

import { ThreeDots } from 'react-loader-spinner';

// utils
import { formatNumber } from '../../utils';

// Components
import ProductLoading from '../../components/common/ProductLoading';

const Cart = () => {
    const {
        cart,
        isLoading,
        isFirstRender,
        updatingItems,
        updateCart,
        deleteCart,
        deleteCartAll,
        isDeletingAll,
    } = useCart();
    const navigate = useNavigate();

    if (isFirstRender) return null;

    return (
        <>
            <section className="cart py-10 py-sm-15">
                <div className="container">
                    <h2 className="fs-7 fs-lg-4 fw-bold text-dark text-center text-lg-start mt-12 mt-sm-17 mb-6 mb-sm-12">
                        您的購物清單
                    </h2>

                    {/* 只有正在 Loading 且畫面清單有東西時才顯示 Loading 組件 */}
                    {isLoading && cart.carts.length > 0 && <ProductLoading />}

                    {/* 空清單：不跑 loading 且沒東西時顯示 */}
                    {!isLoading && cart.carts.length === 0 && (
                        <div className="bg-white rounded-4 border py-10 py-sm-15 px-5 mb-15 text-center">
                            <h3 className="text-muted fs-8 fs-sm-6 fw-semibold mb-2">購物清單目前是空的</h3>
                            <p className="text-muted mb-6">去探索我們的精選系列，找尋您的下一段旅程。</p>
                            <Link to="/product" className="btn btn-primary px-10 py-3">
                                前往套票行程
                            </Link>
                        </div>
                    )}

                    <div
                        className={`row flex-xl-nowrap row-gap-6 g-xl-15 ${isLoading ? 'd-none' : 'isLoaded'}`}
                    >
                        <div className="col-xl-8">
                            {cart.carts.length > 0 && (
                                <>
                                    {cart.carts.map((item) => (
                                        <div
                                            className="d-flex justify-content-between align-items-center gap-3 gap-sm-4 bg-white rounded-4 border p-3 p-sm-4 mb-3 mb-sm-5"
                                            key={item.id}
                                        >
                                            <div className="cart-img">
                                                <img
                                                    src={`${item.product.imageUrl}?q=80&w=150&auto=format&fit=crop`}
                                                    alt={item.product.title}
                                                />
                                            </div>

                                            <div className="d-flex flex-column flex-md-row gap-md-10 row-gap-1 row-gap-sm-3">
                                                <div className="d-flex flex-column me-auto gap-md-2">
                                                    <p className="fs-10 fs-md-9 fw-bold">
                                                        {item.product.title}
                                                    </p>
                                                    <span className="text-muted small text-truncate-2">
                                                        {item.product.description}
                                                    </span>
                                                </div>

                                                <div className="cart-edit d-flex justify-content-between align-items-center gap-2 gap-sm-4 flex-grow-1">
                                                    <div className="d-flex justify-content-between align-items-center rounded-4 gap-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary rounded-pill p-0"
                                                            disabled={
                                                                item.qty <= 1 || updatingItems.has(item.id)
                                                            }
                                                            onClick={() =>
                                                                updateCart(
                                                                    item.id,
                                                                    item.product_id,
                                                                    item.qty - 1
                                                                )
                                                            }
                                                        >
                                                            <i className="material-symbols-outlined fs-11 fs-md-10">
                                                                remove
                                                            </i>
                                                        </button>
                                                        <span className="fs-10 fs-md-9 fw-bold font-montserrat">
                                                            {item.qty}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary rounded-pill p-0"
                                                            disabled={updatingItems.has(item.id)}
                                                            onClick={() =>
                                                                updateCart(
                                                                    item.id,
                                                                    item.product_id,
                                                                    item.qty + 1
                                                                )
                                                            }
                                                        >
                                                            <i className="material-symbols-outlined fs-11 fs-md-10">
                                                                add
                                                            </i>
                                                        </button>
                                                    </div>
                                                    <p>${formatNumber(item.total)}</p>
                                                    <div className="ms-auto">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger d-flex align-items-center px-1 py-0 px-sm-2 py-sm-1 text-nowrap fs-12"
                                                            onClick={() => deleteCart(item.id)}
                                                        >
                                                            {updatingItems.has(item.id) ? (
                                                                <div className="d-flex justify-content-center align-items-center">
                                                                    <span className="fs-12 me-1">刪除中</span>
                                                                    <ThreeDots
                                                                        color="currentColor"
                                                                        width="15"
                                                                        height="8"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <span className="material-symbols-outlined fs-11 me-sm-1">
                                                                        delete
                                                                    </span>
                                                                    刪除
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="text-end mb-sm-5">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger fs-11 fw-bold"
                                            onClick={deleteCartAll}
                                            disabled={isDeletingAll}
                                        >
                                            {isDeletingAll ? (
                                                <>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <span className="fs-11 me-1">清除中</span>
                                                        <ThreeDots
                                                            color="currentColor"
                                                            width="30"
                                                            height="16"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                '清除全部'
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="col-xl-4">
                            {cart.carts.length > 0 && (
                                <div className="cartPrice bg-white w-100 rounded-4 border p-5 p-lg-8 mb-5">
                                    <div className="d-flex flex-column row-gap-6 border-bottom mb-4 pb-6">
                                        <p className="fs-9 fs-lg-8 fw-bold">清單摘要</p>
                                        <div className="d-flex flex-column row-gap-3">
                                            {cart.carts.map((item) => (
                                                <div className="d-flex justify-content-between  fw-bold font-montserrat">
                                                    <p className="text-muted">
                                                        {item.product.title}
                                                        <span className="ms-1">x{item.qty}</span>
                                                    </p>
                                                    <p>${formatNumber(item.total)}</p>
                                                </div>
                                            ))}
                                            <p className="d-flex justify-content-between  fw-bold font-montserrat">
                                                <span className="text-muted">折扣</span>
                                                <span>$ 0</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="d-flex justify-content-between fs-9 fs-sm-7 fw-bold font-montserrat mb-7">
                                        <span>總計</span>
                                        <span>$ {formatNumber(cart.final_total)}</span>
                                    </p>
                                    <div className="d-flex flex-column gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-primary w-100 py-4 fs-10 fw-bold"
                                            onClick={() => navigate('/order')}
                                        >
                                            確認預訂
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-light w-100 py-4 fs-10 fw-bold"
                                            onClick={() => navigate('/product')}
                                        >
                                            繼續購物
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
export default Cart;

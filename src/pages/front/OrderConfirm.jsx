import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ThreeDots } from 'react-loader-spinner';

import { useOrder } from '../../context/useOrder';

import { formatNumber, getErrorMessage } from '../../utils';

import ProductLoading from '../../components/common/ProductLoading';

const OrderConfirm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentOrder, isLoading, isPaying, getOrderDetail, payOrder } = useOrder();

    useEffect(() => {
        if (id) {
            getOrderDetail(id);
        }
    }, [id, getOrderDetail]);

    // 禁用返回上一頁
    useEffect(() => {
        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
        };

        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handlePay = async () => {
        try {
            const res = await payOrder(id);
            alert(res.message || '付款成功！');
            navigate(`/order-success/${id}`, { replace: true });
        } catch (error) {
            alert(`付款失敗：${getErrorMessage(error)}`);
        }
    };

    const { user, products } = currentOrder || {};

    return (
        <section className="py-10 py-sm-15">
            <div className="container">
                <h2 className="fs-7 fs-lg-4 fw-bold text-dark text-center text-lg-start mt-12 mt-sm-17 mb-6 mb-sm-12">
                    訂單確認
                </h2>

                {/* Loading */}
                {(isLoading || !currentOrder) && <ProductLoading />}

                <div
                    className={`row flex-xl-nowrap row-gap-6 g-xl-15 ${isLoading || !currentOrder ? 'd-none' : 'isLoaded'}`}
                >
                    {/* 訂單確認 */}
                    <div className="col-xl-8">
                        {/* 旅客資訊 */}
                        <div className="bg-white rounded-4 border p-5 p-lg-8 mb-6">
                            <h3 className="fs-9 fs-lg-8 fw-bold mb-4">旅客資訊</h3>
                            <div className="row row-gap-4">
                                <div className="col-md-6">
                                    <p className="text-muted small">姓名</p>
                                    <p className="fw-bold">{user?.name || '-'}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="text-muted small">電子郵件</p>
                                    <p className="fw-bold">{user?.email || '-'}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="text-muted small">聯絡電話</p>
                                    <p className="fw-bold">{user?.tel || '-'}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="text-muted small">通訊地址</p>
                                    <p className="fw-bold">{user?.address || '-'}</p>
                                </div>
                                {currentOrder?.message && (
                                    <div className="col-12">
                                        <p className="text-muted small">特殊需求</p>
                                        <p className="fw-bold">{currentOrder.message}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 購物內容 */}
                        <div className="bg-white rounded-4 border p-5 p-lg-8">
                            <h3 className="fs-9 fs-lg-8 fw-bold mb-4">購物內容</h3>
                            <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="ps-0">
                                                商品
                                            </th>
                                            <th scope="col" className="pe-0 text-end">
                                                小計
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products &&
                                            Object.values(products).map((item) => (
                                                <tr key={item.id}>
                                                    <td className="ps-0">
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={item.product?.imageUrl}
                                                                alt={item.product?.title}
                                                                className="rounded me-3"
                                                                style={{
                                                                    width: '60px',
                                                                    height: '60px',
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                            <p className="text-muted fw-bold font-montserrat">
                                                                {item.product.title}
                                                                <span className="ms-1">x{item.qty}</span>
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="pe-0">
                                                        <p className="text-end fw-bold font-montserrat">
                                                            ${formatNumber(item.total)}
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 訂單摘要 */}
                    <div className="col-xl-4">
                        {currentOrder && (
                            <div className="cartPrice bg-white w-100 rounded-4 border p-5 p-lg-8 mb-5">
                                <div className="d-flex flex-column row-gap-6 border-bottom mb-4 pb-6">
                                    <p className="fs-9 fs-lg-8 fw-bold">訂單摘要</p>
                                    <div className="d-flex flex-column row-gap-3">
                                        <p className="d-flex justify-content-between fw-bold font-montserrat">
                                            <span className="text-muted">訂單編號</span>
                                            <span>{currentOrder?.id}</span>
                                        </p>
                                        <p className="d-flex justify-content-between fw-bold font-montserrat">
                                            <span className="text-muted">付款狀態</span>
                                            <span
                                                className={`${currentOrder?.is_paid ? 'text-success' : 'text-danger'}`}
                                            >
                                                {currentOrder?.is_paid ? '已付款' : '未付款'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <p className="d-flex justify-content-between align-items-center fs-9 fs-sm-7 fw-bold font-montserrat mb-7">
                                    <span>總金額</span>
                                    <span>${formatNumber(currentOrder?.total)}</span>
                                </p>

                                {!currentOrder?.is_paid ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100 py-4 fs-10 fw-bold"
                                        onClick={handlePay}
                                        disabled={isPaying}
                                    >
                                        {isPaying ? (
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <span className="text-white fs-11">處理中</span>
                                                <ThreeDots color="white" width="30" height="16" />
                                            </div>
                                        ) : (
                                            '立即付款'
                                        )}
                                    </button>
                                ) : (
                                    <Link to="/" className="btn btn-light w-100 py-4 fs-10 fw-bold">
                                        返回首頁
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderConfirm;

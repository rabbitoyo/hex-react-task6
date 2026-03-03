import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useOrder } from '../../context/useOrder';
import { formatNumber } from '../../utils';
import ProductLoading from '../../components/common/ProductLoading';

const OrderSuccess = () => {
    const { id } = useParams();
    const { currentOrder, isLoading, getOrderDetail } = useOrder();

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

    return (
        <section className="py-10 py-sm-15">
            <div className="container">
                {/* Loading */}
                {(isLoading || !currentOrder) && (
                    <div className="py-15">
                        <ProductLoading />
                    </div>
                )}

                <div className={`pt-15 ${isLoading || !currentOrder ? 'd-none' : 'isLoaded'}`}>
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-lg-8 col-xl-6">
                            <div className="bg-white rounded-4 border p-5 p-lg-8 text-center">
                                {/* 成功圖示 */}
                                <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle mb-4">
                                    <i className="text-success material-symbols-outlined fs-4 p-3">check</i>
                                </div>

                                <h2 className="fs-5 fw-bold text-success mb-3">付款成功</h2>
                                <p className="text-muted mb-6">感謝您的訂購，我們將盡快為您安排行程</p>

                                {/* 訂單資訊 */}
                                <div className="bg-light rounded-3 p-4 mb-6">
                                    <div className="d-flex flex-column row-gap-3">
                                        <p className="d-flex justify-content-between">
                                            <span className="text-muted">訂單編號</span>
                                            <span className="fw-bold font-montserrat">
                                                {currentOrder?.id}
                                            </span>
                                        </p>
                                        <p className="d-flex justify-content-between">
                                            <span className="text-muted">付款狀態</span>
                                            <span className="fw-bold text-success">
                                                {currentOrder?.is_paid ? '已付款' : '未付款'}
                                            </span>
                                        </p>
                                        <p className="d-flex justify-content-between">
                                            <span className="text-muted">訂單金額</span>
                                            <span className="fw-bold font-montserrat">
                                                ${formatNumber(currentOrder?.total)}
                                            </span>
                                        </p>
                                        <p className="d-flex justify-content-between">
                                            <span className="text-muted">訂購人</span>
                                            <span className="fw-bold font-montserrat">
                                                {currentOrder?.user?.name}
                                            </span>
                                        </p>
                                        <p className="d-flex justify-content-between">
                                            <span className="text-muted">聯絡電話</span>
                                            <span className="fw-bold font-montserrat">
                                                {currentOrder?.user?.tel}
                                            </span>
                                        </p>
                                        <p className="d-flex justify-content-between">
                                            <span className="text-muted">電子郵件</span>
                                            <span className="fw-bold font-montserrat">
                                                {currentOrder?.user?.email}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* 按鈕 */}
                                <div className="d-flex justify-content-center">
                                    <Link to="/" className="btn btn-primary w-100 py-4 fs-10 fw-bold">
                                        返回首頁
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderSuccess;

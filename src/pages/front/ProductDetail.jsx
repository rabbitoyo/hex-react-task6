import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router';
import DOMPurify from 'dompurify';
import { ThreeDots } from 'react-loader-spinner';

// Context
import { useCart } from '../../context/useCart';

// Components
import ProductLoading from '../../components/common/ProductLoading';

// Utils
import { getErrorMessage, formatNumber } from '../../utils';

// API
import { getProductDetailApi } from '../../api/front';

const ProductDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [loadingCartId, setLoadingCartId] = useState(null);
    const [qty, setQty] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const getProductDetail = async (productId) => {
            setIsLoading(true);
            try {
                const res = await getProductDetailApi(productId);
                setProduct(res.data.product);
            } catch (error) {
                alert(`API 錯誤：${getErrorMessage(error)}!`);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1500);
            }
        };
        getProductDetail(id);
    }, [id]);

    // 加入購物車
    const handleAddToCart = async (id, qty) => {
        setLoadingCartId(id);
        try {
            const res = await addToCart(id, qty);
            if (res?.data?.success) {
                alert(`${res?.data?.message}！`);
                navigate('/cart');
            }
        } catch (error) {
            alert(`API 錯誤：${getErrorMessage(error)}!`);
        } finally {
            setLoadingCartId(null);
        }
    };

    // 減少數量
    const handleDecreaseQty = () => {
        setQty((prevQty) => Math.max(1, prevQty - 1));
    };

    // 增加數量
    const handleIncreaseQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    return (
        <>
            <section className="productDetail">
                {isLoading && (
                    <div className="vh-100 d-flex justify-content-center align-items-center">
                        <ProductLoading />
                    </div>
                )}

                <div className={`${isLoading ? 'd-none' : 'isLoaded'}`}>
                    <div className="product-img">
                        <div className="d-flex w-100 h-100">
                            <img
                                src={`${product.imageUrl}?q=70&w=1170&auto=format&fit=crop`}
                                alt={product.title}
                            />
                            <div className="d-flex flex-column justify-content-end w-100 h-100 pb-6 z-1">
                                <div className="container">
                                    <span className="text-white-50 text-small fw-bold small mb-3">
                                        {product.category}
                                    </span>
                                    <h2 className="fs-7 fs-lg-6 fw-bold text-white">{product.title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-10 py-sm-15">
                        <div className="container">
                            <div className="row flex-xl-nowrap row-gap-6 g-xl-15">
                                <div className="col-xl-8">
                                    <div className="d-flex flex-column gap-8 gap-lg-15">
                                        <div className="d-block">
                                            <h3 className="fs-9 fs-lg-8 fw-bold border-bottom pb-2 mb-4">
                                                行程簡介
                                            </h3>
                                            <p className="text-dark">{product.description}</p>
                                        </div>
                                        <div className="d-block">
                                            <h3 className="fs-9 fs-lg-8 fw-bold border-bottom pb-2 mb-4">
                                                行程內容
                                            </h3>
                                            <div
                                                className="text-dark" // 這裡加上 DOMPurify.sanitize()
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(product.content),
                                                }}
                                            ></div>
                                        </div>
                                        <div className="d-block">
                                            <h3 className="fs-9 fs-lg-8 fw-bold border-bottom pb-2 mb-4">
                                                行程景點
                                            </h3>
                                            <div className="d-flex flex-column flex-md-row gap-2 gap-lg-4">
                                                {product.imagesUrl &&
                                                    product.imagesUrl.map((url, index) => (
                                                        <div className="detail-img img-thumbnail" key={index}>
                                                            <img
                                                                src={`${url}?q=80&w=500&auto=format&fit=crop`}
                                                                alt={`${product.title} ${index + 1}`}
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                        <div className="d-block">
                                            <h3 className="fs-9 fs-lg-8 fw-bold border-bottom pb-2 mb-4">
                                                費用包含
                                            </h3>
                                            <ul className="list-unstyled d-flex flex-column gap-2 gap-lg-4">
                                                <li className="d-flex align-items-center">
                                                    <i className="material-symbols-outlined me-2 text-success">
                                                        check
                                                    </i>
                                                    往返商務艙機票
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <i className="material-symbols-outlined me-2 text-success">
                                                        check
                                                    </i>
                                                    全程豪華酒店住宿
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <i className="material-symbols-outlined me-2 text-success">
                                                        check
                                                    </i>
                                                    飯店自助吧
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <i className="material-symbols-outlined me-2 text-success">
                                                        check
                                                    </i>
                                                    機場私人接送服務
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="productPrice bg-white w-100 rounded-4 border text-end p-5 p-lg-8 mb-5">
                                        <span className="font-montserrat text-muted">
                                            原價 $ <del>{formatNumber(product.origin_price)}</del>
                                        </span>
                                        <p className="fs-7 fs-lg-6 fw-bold font-montserrat mb-4">
                                            $ {formatNumber(product.price)}{' '}
                                            <span className="text-muted fs-11 fw-semibold">
                                                / 每{product.unit}
                                            </span>
                                        </p>
                                        <div className="d-flex justify-content-center border-top pt-4 mb-4">
                                            <div className="d-flex justify-content-between align-items-center rounded-4 gap-2 w-100">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary rounded-pill p-2"
                                                    disabled={qty === 1}
                                                    onClick={handleDecreaseQty}
                                                >
                                                    <i className="material-symbols-outlined fs-10">remove</i>
                                                </button>
                                                <span className="fs-7 fs-lg-6 fw-bold font-montserrat">
                                                    {qty}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary rounded-pill p-2"
                                                    onClick={handleIncreaseQty}
                                                >
                                                    <i className="material-symbols-outlined fs-10">add</i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary w-100 py-4 fs-10 fw-bold"
                                                onClick={() => handleAddToCart(product.id, qty)}
                                                disabled={loadingCartId === product.id}
                                            >
                                                {loadingCartId === product.id ? (
                                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                                        <span className="text-white fs-11">加入中</span>
                                                        <ThreeDots color="white" width="30" height="16" />
                                                    </div>
                                                ) : (
                                                    '立即預訂'
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-light w-100 py-4 fs-10 fw-bold"
                                                onClick={() => navigate('/product')}
                                            >
                                                返回列表
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default ProductDetail;

import { useState, useRef, useEffect } from 'react';

// 第三方套件
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Components
import Header from '../../components/layout/Header';
import ProductLoading from '../../components/common/ProductLoading';
import ProductCard from '../../components/common/ProductCard';

// Utils
import { getErrorMessage } from '../../utils';

// API
import { getProductsApi } from '../../api/front';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const swiperRef = useRef(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await getProductsApi();

                const productsWithMeta = res.data.products.map((product) => ({
                    ...product,

                    flightNumber: `ZV${Math.floor(Math.random() * 900) + 100}`,

                    bookingCount: Math.floor(Math.random() * 201) + 100,

                    avatars: Array.from({ length: 3 }, () => Math.floor(Math.random() * 10000)),
                }));

                // 排序
                const sortedProducts = [...productsWithMeta].sort((a, b) => b.bookingCount - a.bookingCount);

                setProducts(sortedProducts);
            } catch (error) {
                alert(`API 錯誤：${getErrorMessage(error)}!`);
            }
        };
        getProducts();
    }, []);

    // 初始化 Swiper
    useEffect(() => {
        if (!products || products.length === 0) return;

        const swiperInstance = new Swiper('.products', {
            modules: [Autoplay],
            slidesPerView: 1.15,
            spaceBetween: 20,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            breakpoints: {
                576: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 2.8,
                    spaceBetween: 24,
                },
                1200: {
                    slidesPerView: 3.4,
                    spaceBetween: 24,
                },
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },
            on: {
                // 當 Swiper 所有的設定（包含 Breakpoints）都套用完成後觸發
                afterInit: () => {
                    // 初始化完成後再等 1 秒才關閉 loading
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1500);
                },
            },
        });

        swiperRef.current = swiperInstance;

        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy();
            }
        };
    }, [products]);

    return (
        <>
            <Header />
            <section className="popularProducts py-10 py-sm-15">
                <div className="container">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center align-items-lg-end mb-6 mb-sm-12">
                        <div className="d-flex flex-column align-items-center align-items-lg-start mb-4 mb-lg-0">
                            <span className="text-primary text-small fw-bold small mb-3">熱門預訂</span>
                            <h3 className="fs-6 fs-lg-4 fw-bold text-dark">行程推薦</h3>
                        </div>
                        <p className="text-description ps-lg-4 py-1 text-center text-lg-start">
                            無數旅人最熱門的選擇。探索旅途誌精選的人氣套票，啟程前往你的下一段故事。
                        </p>
                    </div>

                    {isLoading && <ProductLoading />}

                    <div className={`products p-2 swiper-container ${isLoading ? 'd-none' : 'isLoaded'}`}>
                        <div className="swiper-wrapper">
                            {products.slice(0, 6).map((product) => (
                                <div className="swiper-slide" key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="exploreProduct py-10 py-sm-15">
                <div className="container">
                    <div className="d-flex flex-column align-items-center">
                        <span className="text-primary text-small fw-bold small mb-3">旅程探索</span>
                        <h3 className="fs-6 fs-lg-4 fw-bold text-dark mb-4">前往世界旅圖</h3>
                        <p className="text-muted ps-lg-4 py-1 text-center text-lg-start">
                            您想去哪裡探索？從城市街角到自然秘境，挑選值得造訪的景點。
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Home;

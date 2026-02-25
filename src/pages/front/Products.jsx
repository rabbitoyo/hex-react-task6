import { useState, useEffect, useMemo } from 'react';

// Components
import ProductLoading from '../../components/common/ProductLoading';
import ProductCard from '../../components/common/ProductCard';
import Pagination from '../../components/common/Pagination';

// Utils
import { getErrorMessage } from '../../utils';

// API
import { getProductsApi } from '../../api/front';

const Products = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleCount, setVisibleCount] = useState(8);

    const getProducts = async () => {
        try {
            setIsLoading(true);

            let allProducts = [];
            let page = 1;
            let totalPages = 1;

            do {
                const res = await getProductsApi(page);

                const productsWithMeta = res.data.products.map((product) => ({
                    ...product,
                    flightNumber: `ZV${Math.floor(Math.random() * 900) + 100}`,
                    bookingCount: Math.floor(Math.random() * 201) + 100,
                    avatars: Array.from({ length: 3 }, () => Math.floor(Math.random() * 10000)),
                }));

                allProducts = [...allProducts, ...productsWithMeta];

                totalPages = res.data.pagination.total_pages;
                page++;
            } while (page <= totalPages);

            setProducts(allProducts);
        } catch (error) {
            alert(`API 錯誤：${getErrorMessage(error)}!`);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 1400) {
                setVisibleCount(6);
            } else {
                setVisibleCount(8);
            }
        };

        updateVisibleCount(); // 初始化
        window.addEventListener('resize', updateVisibleCount);

        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    // 計算總頁數
    const totalPages = useMemo(() => {
        return Math.ceil(products.length / visibleCount);
    }, [products.length, visibleCount]);

    // 縮放後頁數超出，自動修正
    useEffect(() => {
        // 捲動回頂部 (優化體驗)
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [totalPages, currentPage]);

    // 目前頁面要顯示的資料
    const visibleProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * visibleCount;
        const endIndex = startIndex + visibleCount;
        return products.slice(startIndex, endIndex);
    }, [products, currentPage, visibleCount]);

    // pagination
    const pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        has_pre: currentPage > 1,
        has_next: currentPage < totalPages,
    };

    return (
        <>
            <section className="products py-10 py-sm-15">
                <div className="container">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center align-items-lg-end pt-12 pt-sm-17 mb-6 mb-sm-12">
                        <div className="d-flex flex-column align-items-center align-items-lg-start mb-4 mb-lg-0">
                            <span className="text-primary text-small fw-bold small mb-3">推薦系列</span>
                            <h2 className="fs-6 fs-lg-4 fw-bold text-dark">精選旅程套票</h2>
                        </div>
                        <p className="text-description ps-lg-4 py-1 text-center text-lg-start">
                            專為重視品質與體驗的旅者打造，展開從容而難忘的遠行。
                        </p>
                    </div>

                    {isLoading && <ProductLoading />}

                    <div className={`products p-2 mb-6 ${isLoading ? 'd-none' : 'isLoaded'}`}>
                        <div className="row row-gap-6">
                            {visibleProducts.map((product) => (
                                <div className="col-md-6 col-lg-4 col-xxl-3" key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {!isLoading && totalPages > 1 && (
                        <Pagination pagination={pagination} onChangePage={setCurrentPage} />
                    )}
                </div>
            </section>
        </>
    );
};
export default Products;

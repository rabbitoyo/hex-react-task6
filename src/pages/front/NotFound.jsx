import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();

    const handleReturn = useCallback(() => {
        navigate('/', { replace: true });
    }, [navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleReturn();
        }, 3000);

        // 組件卸載時清除計時器
        return () => clearTimeout(timer);
    }, [handleReturn]);

    return (
        <>
            <section className="notfound position-relative d-flex align-items-center justify-content-center bg-white min-vh-100 overflow-hidden">
                <div className="notfound-text">404</div>

                <div className="container">
                    <div className="mb-4">
                        <span className="text-primary text-small small fw-bold mb-2">迷失在旅途中</span>
                        <h1 className="fs-5 fs-md-1 fw-bold text-dark mb-4">糟糕！網頁遺失</h1>
                        <p className="text-muted mx-auto mb-7">
                            看來您偏離了已知航線。
                            <br />
                            這段旅程並不存在，或已遷往更遙遠的國度。
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary px-10 fs-11 fs-md-10 fw-bold"
                        onClick={handleReturn}
                    >
                        返回首頁
                    </button>
                </div>
            </section>
        </>
    );
};
export default NotFound;

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ProductLoading = () => {
    return (
        <div className="ProductLoading d-flex flex-column justify-content-center align-items-center">
            {/* Lottie 動畫 */}
            <div className="lottie">
                <DotLottieReact
                    src="https://lottie.host/0e6004c5-0baa-4b2b-8822-eb4be2ce0777/Lsdvx7xef9.lottie"
                    loop
                    autoplay
                />
            </div>
            <div className="loading-text">正在準備你的下一段旅途…</div>
        </div>
    );
};
export default ProductLoading;

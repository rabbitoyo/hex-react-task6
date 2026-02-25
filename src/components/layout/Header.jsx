import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const heroRef = useRef(null);
    const bgRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const btnsRef = useRef(null);
    const indicatorRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                y: 150,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            const tl = gsap.timeline({
                defaults: { duration: 1, ease: 'power3.out' },
            });

            tl.from(titleRef.current, { y: 80, opacity: 0 })
                .from(subtitleRef.current, { y: -50, opacity: 0 }, '-=0.5') // 比前一個動畫提早 0.5 秒開始
                .from(
                    [btnsRef.current, indicatorRef.current],
                    {
                        y: 20,
                        opacity: 0,
                        stagger: 0.2, // 讓按鈕跟指標錯開出現
                    },
                    '-=0.3'
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <header
                ref={heroRef}
                className="header vh-100 w-100 d-flex flex-column align-items-center justify-content-center overflow-hidden bg-light"
            >
                <div
                    ref={bgRef}
                    className="position-absolute top-0 start-0 w-100 h-100 z-0"
                    style={{
                        backgroundColor: 'white',
                        backgroundImage: `url('https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2000&auto=format&fit=crop')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                />

                <div className="container">
                    <h2 ref={titleRef} className="fs-4 fs-sm-3 fs-lg-1 fw-bold text-center mb-1 mb-sm-2">
                        <div className="d-flex justify-content-center align-items-center">
                            <span className="material-symbols-outlined fs-9 fs-sm-8 fs-lg-6 me-3">
                                multiple_airports
                            </span>
                            探索世界
                            <span className="material-symbols-outlined fs-9 fs-sm-8 fs-lg-6 ms-2">
                                multiple_airports
                            </span>
                        </div>
                        <span className="text-medium">分享旅程碎片</span>
                    </h2>
                    <p ref={subtitleRef} className="fs-11 fs-lg-10 fw-semibold text-center text-dark">
                        Explore. Plan. Share.
                    </p>

                    <div ref={btnsRef} className="d-flex justify-content-center mt-6 mt-lg-8 gap-3 gap-lg-5">
                        <Link to="/product" className="btn btn-primary">
                            立即預訂
                        </Link>
                        <Link to="/explore" className="btn btn-dark">
                            探索更多
                        </Link>
                    </div>
                </div>

                <div ref={indicatorRef} className="scroll-indicator d-flex flex-column align-items-center">
                    <div className="scroll-indicator__track d-none d-lg-flex">
                        <div className="scroll-indicator__dot"></div>
                    </div>
                    <span className="material-symbols-outlined mt-2">keyboard_double_arrow_down</span>
                </div>
            </header>
        </>
    );
};
export default Header;

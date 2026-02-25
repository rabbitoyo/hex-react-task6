import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, NavLink } from 'react-router';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import { useCart } from '../../context/useCart';

import logo from '../../assets/images/logo.svg';

const routes = [
    { name: '首頁', path: '/' },
    { name: '探索', path: '/explore' },
    { name: '最新活動', path: '/event' },
    { name: '套票行程', path: '/product' },
    { name: '行程靈感', path: '/notes' },
];

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [show, setShow] = useState(false);
    const offcanvasRef = useRef(null);
    const instanceRef = useRef(null);
    const { cart } = useCart();

    const handleClose = useCallback(() => {
        setShow(false);
    }, []);

    const handleLinkClick = () => {
        if (instanceRef.current) {
            instanceRef.current.hide();
        }
        handleClose();
        window.scrollTo(0, 0);
    };

    // 監聽視窗寬度：若超過 lg (992px) 則自動關閉 offcanvas
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992 && show) {
                if (instanceRef.current) {
                    instanceRef.current.hide();
                }
                handleClose();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [show, handleClose]);

    // 初始化與控制 Offcanvas 實例
    useEffect(() => {
        if (!offcanvasRef.current) return;

        if (!instanceRef.current) {
            instanceRef.current = new Offcanvas(offcanvasRef.current);
        }

        if (show) {
            instanceRef.current.show();
        } else {
            instanceRef.current.hide();
        }
    }, [show]);

    // 處理 Bootstrap 原生隱藏事件與清理
    useEffect(() => {
        const el = offcanvasRef.current;
        if (!el) return;

        const onHidden = () => handleClose();
        el.addEventListener('hidden.bs.offcanvas', onHidden);

        return () => {
            el.removeEventListener('hidden.bs.offcanvas', onHidden);
            if (instanceRef.current) {
                instanceRef.current.dispose();
                instanceRef.current = null;
            }
        };
    }, [handleClose]);

    // 滾動監聽
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`navbar fixed-top shadow-sm ${isScrolled ? 'lighten' : ''}`}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        {/* Logo */}
                        <Link to="/" className="navbar-brand d-flex align-items-center column-gap-2">
                            <img className="img-fluid" src={logo} alt="TravNote 旅途" />
                            <h1 className="fs-10 fs-sm-9 fw-bold lh-1 font-montserrat">TravNote 旅途</h1>
                        </Link>

                        {/* Menu */}
                        <ul className="navbar-nav d-none d-lg-flex flex-row justify-content-center align-items-center gap-2 gap-lg-8">
                            {routes.map((route) => (
                                <li className="nav-item" key={route.name}>
                                    <NavLink to={route.path} className="nav-link">
                                        {route.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <div className="d-flex alingn-items-center gap-2 ms-auto ms-lg-0">
                            {/* Cart */}
                            <Link to="/cart" className="link-primary position-relative">
                                <i className="material-symbols-outlined">local_mall</i>
                                {cart.carts.length > 0 && (
                                    <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger">
                                        {cart.carts.length}
                                    </span>
                                )}
                            </Link>

                            {/* Login */}
                            <Link
                                to="/login"
                                className="link-primary d-none d-lg-flex align-items-center gap-1"
                            >
                                <i className="material-symbols-outlined">person</i>
                                <span>登入 / 註冊</span>
                            </Link>
                        </div>

                        <button
                            type="button"
                            className="navbar-toggler d-lg-none"
                            onClick={() => setShow(true)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>

                    <div className="offcanvas offcanvas-end" tabIndex="-1" ref={offcanvasRef}>
                        <div className="offcanvas-header">
                            {/* Logo */}
                            <Link to="/" className="navbar-brand d-flex align-items-center column-gap-2">
                                <img className="img-fluid" src={logo} alt="TravNote 旅途" />
                                <h1 className="fs-10 fs-sm-9 fw-bold lh-1">TravNote 旅途</h1>
                            </Link>
                            <button type="button" className="btn-close" onClick={handleClose}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="offcanvas-body d-flex flex-column justify-content-center">
                            {/* Menu */}
                            <ul className="navbar-nav justify-content-center align-items-center gap-8">
                                {routes.map((route) => (
                                    <li className="nav-item" key={route.name}>
                                        <NavLink
                                            to={route.path}
                                            className="nav-link"
                                            onClick={handleLinkClick}
                                        >
                                            {route.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>

                            {/* Login */}
                            <Link
                                to="/login"
                                className="btn btn-primary d-flex justify-content-center align-items-center gap-1 rounded-pill mt-auto"
                            >
                                <i className="material-symbols-outlined">person</i>
                                <span>登入 / 註冊</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default NavBar;

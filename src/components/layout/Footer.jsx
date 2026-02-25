import { Link } from 'react-router';

import logo from '../../assets/images/logo.svg';

const routes = [
    { name: '首頁', path: '/' },
    { name: '探索', path: '/explore' },
    { name: '最新活動', path: '/event' },
    { name: '套票行程', path: '/product' },
    { name: '行程靈感', path: '/notes' },
];

const Footer = () => {
    return (
        <>
            <footer className="footer bg-white py-10 py-sm-15">
                <div className="container">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center align-items-lg-end row-gap-10">
                        <div className="d-flex flex-column align-items-center align-items-lg-start gap-2">
                            {/* Logo */}
                            <Link
                                to="/"
                                className="navbar-brand d-flex justify-content-center justify-content-lg-start align-items-center column-gap-2"
                            >
                                <img className="img-fluid" src={logo} alt="TravNote 旅途" />
                                <span className="fs-9 fw-bold lh-1 font-montserrat">TravNote 旅途</span>
                            </Link>

                            <p className="text-muted small mb-0" style={{ maxWidth: '300px' }}>
                                從這裡開始，把每段旅程變成完整故事
                            </p>
                        </div>
                        <nav className="navbar p-0">
                            {/* Menu */}
                            <ul className="navbar-nav d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 gap-lg-8">
                                {routes.map((route, index) => (
                                    <li
                                        className={`nav-item ${index === 0 ? 'd-none' : ''}`}
                                        key={route.name}
                                    >
                                        <Link to={route.path} className="nav-link">
                                            {route.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <hr className="my-7 my-sm-8 opacity-10" />

                    <div className="text-center text-muted small">
                        &copy; {new Date().getFullYear()} TravNote 旅途 │ 探索世界，分享旅途碎片
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;

import { useState } from 'react';
import { useNavigate } from 'react-router';

// Utils
import { setToken, getErrorMessage } from '../../utils';

// API
import { loginApi } from '../../api/auth';

// Login 元件
const Login = () => {
    const [account, setAccount] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    // 拿到用戶 input 的 value
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccount((prevData) => ({ ...prevData, [name]: value }));
    };

    // 登入
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await loginApi(account);

            // token - 儲存 Token 到 Cookie
            const { token, expired } = res.data;
            setToken(token, expired);

            alert(`${res?.data?.message}!`);
            navigate('/admin');
        } catch (error) {
            alert(`${getErrorMessage(error)}!`);
        }
    };

    return (
        <section className="login bg-white py-10 py-sm-15">
            <div className="container">
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-7 w-100 pt-18 pb-4">
                    <div className="login-img">
                        <div
                            className="position-absolute bottom-0 start-0 p-5 w-100"
                            style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}
                        >
                            <p className="text-white text-center text-lg-start">
                                「 世界是被翻閱的篇章，而旅行，讓你親自書寫每一頁。 」
                                <br />
                                <span className="text-white-50 ps-lg-2">— TravNote 旅途</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex-grow-1 w-100">
                        <div className="login-box">
                            <div className="text-center mb-7 mb-lg-10">
                                <h2 className="d-flex justify-content-center align-items-center gap-2 gap-lg-3 fs-6 fs-lg-5 fw-bold mb-2 font-montserrat">
                                    <span className="material-symbols-outlined bg-dark text-white rounded-2 fs-11 fs-lg-10 p-2">
                                        travel
                                    </span>
                                    Happy Travel
                                </h2>
                                <p className="text-muted fs-12 fs-lg-11">
                                    登入以管理您的旅程、收藏與預訂資訊。
                                </p>
                            </div>

                            <form className="d-flex flex-column gap-3 gap-lg-2" onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label
                                        className="form-label text-muted small fw-semibold mb-1 mb-lg-2"
                                        htmlFor="username"
                                    >
                                        電子郵件
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control bg-white rounded-sm"
                                        name="username"
                                        value={account.username}
                                        onChange={handleInputChange}
                                        id="username"
                                        placeholder="請輸入 Email"
                                        autoFocus
                                        required
                                    />
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div className="form-group">
                                    <label
                                        className="form-label text-muted small fw-semibold mb-1 mb-lg-2"
                                        htmlFor="password"
                                    >
                                        密碼
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control bg-white rounded-sm"
                                        name="password"
                                        value={account.password}
                                        onChange={handleInputChange}
                                        id="password"
                                        placeholder="請輸入密碼"
                                        required
                                    />
                                    <span className="material-symbols-outlined">lock_person</span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg rounded-sm fw-semibold py-3 mt-7 mt-lg-10"
                                >
                                    登入
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

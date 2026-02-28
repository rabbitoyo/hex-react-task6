import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

// Utils
import { setToken, getErrorMessage, emailValidation } from '../../utils';

// API
import { loginApi } from '../../api/auth';

// Login 元件
const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            username: '',
            password: '',
        },
    });

    // 登入
    const onSubmit = async (formData) => {
        try {
            const res = await loginApi(formData);

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

                            <form
                                className="d-flex flex-column gap-3 gap-lg-2"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="form-group">
                                    <label
                                        className="form-label text-muted small fw-semibold mb-1 mb-lg-2"
                                        htmlFor="username"
                                    >
                                        電子郵件
                                        <span className="text-danger ms-1">*</span>
                                    </label>
                                    {errors.username && (
                                        <span className="text-danger small ms-2">
                                            ({errors.username.message})
                                        </span>
                                    )}
                                    <input
                                        type="email"
                                        id="username"
                                        name="username"
                                        className={`form-control bg-white rounded-sm ${errors.username ? 'is-invalid' : ''}`}
                                        placeholder="請輸入 Email"
                                        {...register('username', emailValidation)}
                                        autoFocus
                                    />
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div className="form-group">
                                    <label
                                        className="form-label text-muted small fw-semibold mb-1 mb-lg-2"
                                        htmlFor="password"
                                    >
                                        密碼
                                        <span className="text-danger ms-1">*</span>
                                    </label>
                                    {errors.password && (
                                        <span className="text-danger small ms-2">
                                            ({errors.password.message})
                                        </span>
                                    )}
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`form-control bg-white rounded-sm ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="請輸入密碼"
                                        {...register('password', {
                                            required: '請輸入密碼',
                                            minLength: {
                                                value: 6,
                                                message: '密碼至少需要 6 個字元',
                                            },
                                        })}
                                    />
                                    <span className="material-symbols-outlined">lock_person</span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg rounded-sm fw-semibold py-3 mt-7 mt-lg-10"
                                    disabled={!isValid}
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

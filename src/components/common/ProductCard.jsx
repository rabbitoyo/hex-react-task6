import { Link } from 'react-router';

// Utils
import { formatNumber } from '../../utils';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="card rounded-4 shadow-sm overflow-hidden">
            {/* Image */}
            <div className="card-img-top">
                <img src={`${product.imageUrl}?q=80&w=800&auto=format&fit=crop`} alt={product.title} />
            </div>

            {/* Perforated Divider */}
            <div className="ticket-divider px-7 py-2">
                <div className="ticket-hole-l"></div>
                <div className="w-100 border-dashed"></div>
                <div className="ticket-hole-r"></div>
            </div>

            {/* Bottom Part: Content */}
            <div className="card-body d-flex flex-column gap-3 p-4 pt-1">
                <div className="d-flex flex-column justify-content-center align-items-start gap-4 h-100">
                    <div className="d-block">
                        <p className="text-primary text-small small fw-bold">{product.category}</p>
                        <h3 className="fs-9 fw-bold text-dark">{product.title}</h3>
                    </div>
                    <p className="card-text text-muted small text-truncate-2">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center font-montserrat mt-auto w-100">
                        <p className="fs-13 text-muted mb-0">航班 #{product.flightNumber}</p>
                        <p className="fs-10 fw-bold text-dark mb-0">${formatNumber(product.price)}</p>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <div className="d-flex align-items-center gap-1">
                        <div className="d-flex">
                            {product.avatars.map((seed, i) => (
                                <div
                                    key={i}
                                    className="rounded-circle border border-2 border-white overflow-hidden"
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        marginLeft: i === 0 ? '0' : '-10px',
                                        flexShrink: 0,
                                    }}
                                >
                                    <img
                                        src={`https://i.pravatar.cc/100?u=${seed}`}
                                        alt="user"
                                        className="w-100 h-100"
                                        style={{
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <span className="small text-muted font-montserrat">
                            已有 {product.bookingCount} 人預訂
                        </span>
                    </div>

                    {/* 條碼 */}
                    <div className="opacity-25" style={{ width: '32px', height: '32px' }}>
                        <svg viewBox="0 0 100 100" className="w-100 h-100">
                            <rect x="0" y="0" width="10" height="100" fill="currentColor" />
                            <rect x="15" y="0" width="5" height="100" fill="currentColor" />
                            <rect x="25" y="0" width="15" height="100" fill="currentColor" />
                            <rect x="45" y="0" width="10" height="100" fill="currentColor" />
                            <rect x="60" y="0" width="20" height="100" fill="currentColor" />
                            <rect x="85" y="0" width="15" height="100" fill="currentColor" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

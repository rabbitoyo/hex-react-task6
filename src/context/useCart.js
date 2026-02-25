import { useContext } from 'react';
import { CartContext } from './CartContext';

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};

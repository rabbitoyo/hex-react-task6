import { useContext } from 'react';
import { OrderContext } from './OrderContext';

export const useOrder = () => {
    const context = useContext(OrderContext);
    return context;
};

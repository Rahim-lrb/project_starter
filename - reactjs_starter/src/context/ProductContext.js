import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext({ items: [], getProductQuantity: () => {}, addOneToCart: () => {}, removeOneFromCart: () => {},
deleteFromCart: () => {}, getTotalCost: () => {}});

export const useProductContext = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    // the logic you want to pass

    return (
        <ProductContext.Provider value={{items, getProductQuantity}}>
        {children}
        </ProductContext.Provider>
    );
};

// wrap index.js with productProvider
// useContext(productContext) or directly, useProductContext
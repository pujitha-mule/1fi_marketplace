import { useState, useEffect, useCallback } from 'react';
import { MarketplaceApi } from '../services/marketplaceApi';

const api = new MarketplaceApi();

export const useMarketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, [fetchProducts]);

  const getProduct = useCallback(async (id) => {
    try {
      return await api.getProductById(id);
    } catch (err) {
      setError(err.message || 'Product not found');
      return null;
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refreshing,
    refresh,
    getProduct,
  };
};
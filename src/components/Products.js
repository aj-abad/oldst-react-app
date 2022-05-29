import { useState, useLayoutEffect, useRef } from "react";
import { Fragment } from "react";
import axios from "axios";
import Ad from "./Ad";
const Products = (props) => {
  const PAGE_SIZE = 20;
  const PRODUCTS_BEFORE_AD = 20;
  const { lastAd, setLastAd } = props;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEndReached, setIsEndReached] = useState(false);
  const sortBy = useRef("");
  const isLoadingRef = useRef(true);
  const cachedProducts = useRef(null);
  const currentPage = useRef(1);

  //ref for element that triggers loading products
  const bottomScrollLoader = useRef(null);
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadNextPage();
      },
      { threshold: 1 }
    );
    observer.observe(bottomScrollLoader.current);
    loadInitialProducts();
    return () => {
      observer.disconnect();
    };
  }, []);
  const loadInitialProducts = () => {
    axios
      .get(
        `products?_page=${currentPage.current}&_limit=${PAGE_SIZE * 2}&${
          sortBy.current && `_sort=${sortBy.current}`
        }`
      )
      .then(({ data }) => {
        //slice array in half
        const half = Math.floor(data.length / 2);
        const firstHalf = data.slice(0, half);
        const secondHalf = data.slice(half);
        //set products to first half
        setProducts([firstHalf]);
        //set cached products to second half
        cachedProducts.current = secondHalf;

        setIsLoading(false);
        isLoadingRef.current = false;
      })
      .catch((err) => alert(err));
  };
  const prefetchProducts = () => {
    axios
      .get(
        `products?_page=${currentPage.current + 1}&_limit=${PAGE_SIZE}&${
          sortBy.current && `_sort=${sortBy.current}`
        }`
      )
      .then(({ data }) => {
        cachedProducts.current = data;
        isLoadingRef.current = false;
        setIsLoading(false);
      })
      .catch((err) => alert(err));
  };
  const loadNextPage = () => {
    if (isLoadingRef.current || !cachedProducts.current) return;
    setProducts((products) => [...products, cachedProducts.current]);
    if (cachedProducts.current.length === 0) return setIsEndReached(true);
    cachedProducts.current = null;
    currentPage.current++;
    isLoadingRef.current = true;
    setIsLoading(true);
    prefetchProducts();
  };

  const getIterator = (i, j) => {
    return PAGE_SIZE * i + 1 + j;
  };

  const setSort = (sort) => {
    setIsEndReached(false);
    sortBy.current = sort;
    setProducts([]);
    cachedProducts.current = null;
    setIsLoading(true);
    currentPage.current = 1;
    loadInitialProducts();
  };

  return (
    <main>
      <div id="scroll-observer" ref={bottomScrollLoader} />
    </main>
  );
};

export default Products;

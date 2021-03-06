import { useState, useLayoutEffect, useRef } from "react";
import { Fragment } from "react";
import axios from "axios";
import Ad from "./Ad";
import Product from "./Product";
import LoadingIndicator from "./LoadingIndicator";

const Products = (props) => {
  //define constants
  const PAGE_SIZE = 20;
  const PRODUCTS_BEFORE_AD = 20;

  //define state
  const { lastAd, setLastAd } = props;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEndReached, setIsEndReached] = useState(false);

  /**
   * I'm primarily a Vue dev so I don't fully get the gotchas of state hooks
   * Hence my use of useRefs for callbacks outside the render function
   * Would like to receive feedback on this
   */
  const sortBy = useRef("");
  const isLoadingRef = useRef(true);
  const cachedProducts = useRef(null);
  const currentPage = useRef(1);

  //ref for element that triggers loading products
  const bottomScrollLoader = useRef(null);

  //Run this when the component elements are mounted
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        /**
         * Has a caveat where if the items are appended when the bottom of the page is visible,
         * the observer callback won't be triggered until the observed element leaves and re-enters the viewport
         *
         * I could either use the less performant scroll event listener
         *
         * Or I could check if the observed element is visible
         * when the products are prefetched and immediately append them
         *
         * But it will start getting messy when I accommodate more edge cases
         * so I decided to just leave it this way
         */
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

  //function for getting the first page of products and preloading the next
  const loadInitialProducts = () => {
    axios
      .get(
        `products?_page=${currentPage.current}&_limit=${PAGE_SIZE * 2}&${
          sortBy.current && `_sort=${sortBy.current}`
        }`
      )
      .then(({ data }) => {
        setProducts([data]);
        setIsLoading(false);
        isLoadingRef.current = false;
        prefetchProducts();
      })
      .catch((err) => alert(err));
  };

  //gets the next page of products
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

  //function that appends the cached products and pre-fetches the next page
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

  //function that flattens the page and product iterators to one dimension
  const getIterator = (i, j) => {
    return PAGE_SIZE * i + 1 + j;
  };

  //function that sets the sorting and resets the products
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
      <aside className="mb-4">
        <label className="d-inline-block mb-2"> Sort by </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="sort-by-id"
            disabled={isLoading}
            onChange={() => setSort("id")}
          />
          <label className="form-check-label" htmlFor="sort-by-id">
            ID
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="sort-by-size"
            disabled={isLoading}
            onChange={() => setSort("size")}
          />
          <label className="form-check-label" htmlFor="sort-by-size">
            Size
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="sort-by-price"
            disabled={isLoading}
            onChange={() => setSort("price")}
          />
          <label className="form-check-label" htmlFor="sort-by-price">
            Price
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="sort-by-date"
            disabled={isLoading}
            onChange={() => setSort("date")}
          />
          <label className="form-check-label" htmlFor="sort-by-date">
            Date
          </label>
        </div>
      </aside>
      {products.map((page, i) => (
        <div className="product-page" key={i}>
          {page.map((product, j) => (
            <Fragment key={j}>
              <Product product={product} />
              {getIterator(i, j) % PRODUCTS_BEFORE_AD === 0 && (
                <div className="my-4">
                  <Ad lastAd={lastAd} setLastAd={setLastAd} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      ))}
      {isLoading && <LoadingIndicator />}
      {isEndReached && (
        <div className="d-flex justify-content-center align-items-center bg-light p-5 mt-3">
          <span className="h3">~ end of catalogue ~</span>
        </div>
      )}
      <div id="scroll-observer" ref={bottomScrollLoader} />
    </main>
  );
};

export default Products;

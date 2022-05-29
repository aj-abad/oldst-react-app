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
  return (
    <main>
      <div id="scroll-observer" ref={bottomScrollLoader} />
    </main>
  );
};

export default Products;

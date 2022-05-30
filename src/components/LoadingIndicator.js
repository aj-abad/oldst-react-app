const LoadingIndicator = () => {
  return (
    <div className="p-5 bg-light d-flex justify-content-center align-items-center">
      <span className="h5 font-weight-regular">
        <span className="loading-anim-l" aria-hidden="true">
          ✿•.¸
        </span>
        Loading more products
        <span className="loading-anim-r" aria-hidden="true">
          ¸.•✿
        </span>
      </span>
    </div>
  );
};

export default LoadingIndicator

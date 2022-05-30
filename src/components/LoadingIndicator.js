const LoadingIndicator = () => {
  return (
    <div className="p-5 bg-light d-flex justify-content-center align-items-center">
      <span className="h5 mb-0">
        <span className="loading-anim-l" aria-hidden="true">
          ❤•.¸✿¸.•❤•.❀•
        </span>
        <span className="mx-2">Loading more products</span>
        <span className="loading-anim-r" aria-hidden="true">
          •❀.•❤•.¸✿¸.•❤
        </span>
      </span>
    </div>
  );
};

export default LoadingIndicator;

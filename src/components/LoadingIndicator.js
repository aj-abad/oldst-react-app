const LoadingIndicator = () => {
  return (
    <div className="p-5 bg-light d-flex justify-content-center align-items-center text-center">
      <span className="user-select-none">
        <small className="loading-anim-l" aria-hidden="true">
          <span className="d-none d-lg-inline">❤•.¸✿¸</span>.•❤•.❀•
        </small>
        <span className="mx-2">Loading more faces</span>
        <small className="loading-anim-r" aria-hidden="true">
          •❀.•❤•.<span className="d-none d-lg-inline">¸✿¸.•❤</span>
        </small>
      </span>
    </div>
  );
};

export default LoadingIndicator;

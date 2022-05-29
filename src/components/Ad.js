const Ad = (props) => {
  const { lastAd, setLastAd } = props;
  const [src, setSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let src = Math.floor(Math.random() * 1000);
    //get a new ad in case of a collision
    while (src === lastAd) {
      src = Math.floor(Math.random() * 1000);
    }
    //only set the src once we're sure that it's not the same as the last ad
    setSrc(src);
  }, []);
  
  return (
    <div>
      <p>But first, a word from our sponsors:</p>
      <img
        src={src && `http://localhost:8000/ads/?r=${src}`}
        alt="ad"
        className={isLoaded ? "img-fluid" : "d-none"}
        onLoad={() => setIsLoaded(true)}
      />

      {/* To prevent layout reflows */}
      <div className={isLoaded ? "d-none" : "skeleton-loader"}>
        Loading ad...
      </div>
    </div>
  );
};

export default Ad;

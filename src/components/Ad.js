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
    </div>
  );
};

export default Ad;

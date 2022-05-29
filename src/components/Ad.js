const Ad = (props) => {
  const { lastAd, setLastAd } = props;
  const [src, setSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div>
      <p>But first, a word from our sponsors:</p>
    </div>
  );
};

export default Ad;

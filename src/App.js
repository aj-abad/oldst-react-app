const App = () => {
  const [lastAd, setLastAd] = useState(null);

  return (
    <div className="App">
      <div className="container py-4 bg-white">
        <header>
          <h1>Products Grid</h1>
          <Ad lastAd={lastAd} setLastAd={setLastAd} />
        </header>
        <hr />
      </div>
    </div>
  );
}

export default App;

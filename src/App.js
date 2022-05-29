import { useState } from "react";
import Ad from "./components/Ad";
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
        {/* Passing the ad props to the products component 
            because it needs to know which ad was displayed in
            the header 
            useContext might be better for more complex use cases
          */}
      </div>
    </div>
  );
}

export default App;

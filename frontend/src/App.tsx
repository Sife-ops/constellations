import "./App.css";
import { getAccessToken } from "./utility/token";

function App() {
  return (
    <div>
      <button
        onClick={() => {
          const token = getAccessToken();
          console.log(token);
        }}
      >
        log access token
      </button>
    </div>
  );
}

export default App;

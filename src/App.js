import Grid from "components/Grid/Grid";
import Header from "components/Header/Header";
import Keyboard from "components/Keyboard/Keyboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Grid />
      <Keyboard />
    </div>
  );
}

export default App;

import "./App.css";
import BasicView from "./components/BasicView/BasicView";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="App printToA4">
      <div>
        <BasicView />
      </div>
      <div className="header">
        
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;

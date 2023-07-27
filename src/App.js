import logo from './logo.svg';
import './App.css';
import YandexDiskUploader from "./components/YandexDiskUploader/YandexDiskUploader";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <YandexDiskUploader />
      </header>
    </div>
  );
}

export default App;

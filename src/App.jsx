import NatalChart from './components/NatalChart/NatalChart';
import svgRaw from './assets/test.svg?raw';
import TopBar from './components/Header/TopBar';
import "../src/app.scss";

export default function App() {
  return (
    <div>
      <TopBar />
      <NatalChart svgContent={svgRaw} />
    </div>
  );
}

import NatalChart from './components/NatalChart/NatalChart';
import svgRaw from './assets/test.svg?raw';
import TopBar from './components/Header/TopBar';
import "../src/app.scss";
import StarBackground from './components/Background/StartBackground';

export default function App() {
  return (
    <div>
      <StarBackground />
      <TopBar />
      <NatalChart svgContent={svgRaw} />
    </div>
  );
}

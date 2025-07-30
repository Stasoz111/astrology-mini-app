import NatalChart from './components/NatalChart';
import svgRaw from './assets/test.svg?raw';

export default function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <NatalChart svgContent={svgRaw} />
    </div>
  );
}

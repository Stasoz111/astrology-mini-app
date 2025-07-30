import { useEffect, useRef } from 'react';

export default function NatalChart({ svgContent }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector('svg');
    if (!svg) return;

    const groupWithTransform = svg.querySelector("g[kr\\:node='Main_Content']");
    const transformMatch = groupWithTransform?.getAttribute('transform')?.match(/translate\((\d+),\s*(\d+)\)/);
    const offsetX = transformMatch ? parseFloat(transformMatch[1]) : 0;
    const offsetY = transformMatch ? parseFloat(transformMatch[2]) : 0;

    const centerX = 240 + offsetX;
    const centerY = 240 + offsetY;

    // === 1. Клики по цифрам домов ===
    const houseNumbers = svg.querySelectorAll("g[kr\\:node='HouseNumber'] tspan");

    houseNumbers.forEach((tspan) => {
      const houseNumber = parseInt(tspan.textContent?.trim(), 10);
      if (!isNaN(houseNumber)) {
        tspan.style.cursor = 'pointer';
        tspan.addEventListener('click', () => {
          console.log(`Нажат дом ${houseNumber}`);
        });
      }
    });

    // === 2. Клики + Подсветка по областям между линиями Cusp ===
    const cuspLines = Array.from(svg.querySelectorAll("g[kr\\:node='Cusp'] line"));
    if (cuspLines.length !== 12) {
      console.warn('Ожидалось 12 линий Cusp, найдено:', cuspLines.length);
      return;
    }

    cuspLines.forEach((line, i) => {
      const nextLine = cuspLines[(i + 1) % 12];

      const x1 = parseFloat(line.getAttribute('x2')) + offsetX;
      const y1 = parseFloat(line.getAttribute('y2')) + offsetY;
      const x2 = parseFloat(nextLine.getAttribute('x2')) + offsetX;
      const y2 = parseFloat(nextLine.getAttribute('y2')) + offsetY;

      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', `${centerX},${centerY} ${x1},${y1} ${x2},${y2}`);
      polygon.setAttribute('fill', 'transparent');
      polygon.setAttribute('data-house', i + 1);
      polygon.style.cursor = 'pointer';
      polygon.style.transition = 'fill 0.2s ease';

      // Добавим подсветку при наведении
      polygon.addEventListener('mouseenter', () => {
        polygon.setAttribute('fill', 'rgba(100, 200, 255, 0.3)');
      });

      polygon.addEventListener('mouseleave', () => {
        polygon.setAttribute('fill', 'transparent');
      });

      polygon.addEventListener('click', () => {
        console.log(`Нажата область дома ${i + 1}`);
      });

      svg.appendChild(polygon);
    });

    // Очистка
    return () => {
      houseNumbers.forEach((tspan) => {
        tspan.replaceWith(tspan.cloneNode(true));
      });
      svg.querySelectorAll('polygon[data-house]').forEach((el) => el.remove());
    };
  }, []);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
}

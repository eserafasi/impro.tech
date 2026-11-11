/**
 * An illustrative ticket stub with a QR-like code drawn as SVG.
 * The pattern is deterministic (same on server and client) and encodes
 * nothing: it is a picture of the artifact, labelled "illustrative".
 */
const SIZE = 21;

function cells(): boolean[][] {
  let seed = 7;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const grid = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => rand() > 0.52));
  // Three finder squares, as on a real QR code.
  const finder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 7; c++) {
        const edge = r === 0 || r === 6 || c === 0 || c === 6;
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[r0 + r][c0 + c] = edge || core;
      }
    for (let i = 0; i < 8; i++) {
      if (r0 + 7 < SIZE && c0 + i < SIZE) grid[r0 + 7][c0 + i] = false;
      if (c0 === 0 && r0 + i < SIZE && 7 < SIZE) grid[r0 + i][7] = false;
      if (c0 > 0 && r0 + i < SIZE) grid[r0 + i][c0 - 1] = false;
      if (r0 > 0 && c0 + i < SIZE) grid[r0 - 1][c0 + i] = false;
    }
  };
  finder(0, 0);
  finder(0, SIZE - 7);
  finder(SIZE - 7, 0);
  return grid;
}

const GRID = cells();

export function TicketStub({ label }: { label: string }) {
  return (
    <div className="ticket">
      <span className="well-tag">{label}</span>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="ticket-qr" aria-hidden="true" shapeRendering="crispEdges">
        {GRID.flatMap((row, r) =>
          row.map((on, c) => (on ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} /> : null)),
        )}
      </svg>
    </div>
  );
}

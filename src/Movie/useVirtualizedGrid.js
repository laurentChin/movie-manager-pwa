import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const OVERSCAN_ROWS = 3;

// Used only until the grid has rendered a real item to measure - matches
// the contain-intrinsic-size hint in MovieList.css so the very first
// frame guesses a sane row count instead of mounting everything.
const BOOTSTRAP_ITEM_HEIGHT = 280;
const BOOTSTRAP_ROW_GAP = 10;
const BOOTSTRAP_COLUMNS = 2;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Mounts only the grid rows near the viewport (plus a small overscan
// buffer) instead of every item at once, and narrows that further down
// to a strictly-visible range for swapping in real poster images. Row
// height is measured off an actual rendered item rather than assumed,
// since it's driven by CSS (aspect-ratio + responsive column width).
export const useVirtualizedGrid = (itemCount) => {
  const gridRef = useRef(null);
  const [layout, setLayout] = useState({
    columns: 0,
    itemHeight: 0,
    rowGap: 0,
  });
  const [mountRange, setMountRange] = useState({ start: 0, end: 0 });
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 0 });

  const measured = layout.itemHeight > 0;
  const columns = layout.columns || BOOTSTRAP_COLUMNS;
  const itemHeight = measured ? layout.itemHeight : BOOTSTRAP_ITEM_HEIGHT;
  const rowGap = measured ? layout.rowGap : BOOTSTRAP_ROW_GAP;

  const computeRanges = useCallback(() => {
    const gridEl = gridRef.current;
    if (!gridEl || itemCount === 0) {
      setMountRange({ start: 0, end: 0 });
      setVisibleRange({ start: 0, end: 0 });
      return;
    }

    const rowPitch = itemHeight + rowGap;
    const totalRows = Math.ceil(itemCount / columns);
    const gridTop = gridEl.getBoundingClientRect().top + window.scrollY;
    const viewTop = window.scrollY;
    const viewBottom = viewTop + window.innerHeight;
    const clampRow = (row) => clamp(row, 0, totalRows - 1);

    const firstVisibleRow = clampRow(
      Math.floor((viewTop - gridTop) / rowPitch)
    );
    const lastVisibleRow = clampRow(
      Math.ceil((viewBottom - gridTop) / rowPitch) - 1
    );
    const firstMountRow = clampRow(firstVisibleRow - OVERSCAN_ROWS);
    const lastMountRow = clampRow(lastVisibleRow + OVERSCAN_ROWS);

    setVisibleRange({
      start: firstVisibleRow * columns,
      end: Math.min(itemCount, (lastVisibleRow + 1) * columns),
    });
    setMountRange({
      start: firstMountRow * columns,
      end: Math.min(itemCount, (lastMountRow + 1) * columns),
    });
  }, [itemCount, columns, itemHeight, rowGap]);

  // Deliberately not throttled through requestAnimationFrame: rAF
  // callbacks get suspended for backgrounded/inactive tabs, which would
  // freeze the mounted window mid-scroll. computeRanges is cheap (one
  // getBoundingClientRect call, no DOM scanning), so running it on every
  // scroll/resize event is fine.
  const scheduleCompute = computeRanges;

  // Column count: read back from the grid itself (auto-fill resolves it
  // from the container width) rather than duplicating the breakpoints
  // from MovieList.css here.
  useLayoutEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const measureColumns = () => {
      const trackCount = getComputedStyle(gridEl)
        .gridTemplateColumns.split(" ")
        .filter(Boolean).length;

      setLayout((prev) =>
        prev.columns === trackCount ? prev : { ...prev, columns: trackCount }
      );
    };

    measureColumns();
    const observer = new ResizeObserver(measureColumns);
    observer.observe(gridEl);
    return () => observer.disconnect();
  }, []);

  // Row pitch: measured off the first mounted item, re-targeted whenever
  // the mounted window (or the underlying item count/order) changes.
  useLayoutEffect(() => {
    const gridEl = gridRef.current;
    const itemEl = gridEl?.querySelector("[data-item-id]");
    if (!gridEl || !itemEl) return;

    const measureRow = () => {
      const nextRowGap = parseFloat(getComputedStyle(gridEl).rowGap) || 0;
      const nextItemHeight = Math.round(itemEl.getBoundingClientRect().height);
      if (nextItemHeight <= 0) return;

      setLayout((prev) =>
        prev.itemHeight === nextItemHeight && prev.rowGap === nextRowGap
          ? prev
          : { ...prev, itemHeight: nextItemHeight, rowGap: nextRowGap }
      );
    };

    measureRow();
    const observer = new ResizeObserver(measureRow);
    observer.observe(itemEl);
    return () => observer.disconnect();
  }, [mountRange.start, itemCount]);

  // Layout effect, not a plain effect: this must settle (together with
  // the column/row measurements above) before the browser's first paint,
  // otherwise the grid flashes empty for a frame while state converges.
  useLayoutEffect(() => {
    computeRanges();
  }, [computeRanges]);

  useEffect(() => {
    window.addEventListener("scroll", scheduleCompute, { passive: true });
    window.addEventListener("resize", scheduleCompute);
    return () => {
      window.removeEventListener("scroll", scheduleCompute);
      window.removeEventListener("resize", scheduleCompute);
    };
  }, [scheduleCompute]);

  const spacerHeight = (rows) =>
    rows > 0 ? rows * itemHeight + Math.max(0, rows - 1) * rowGap : 0;

  const topRows = Math.floor(mountRange.start / columns);
  const bottomRows = Math.max(
    0,
    Math.ceil(itemCount / columns) - Math.ceil(mountRange.end / columns)
  );

  return {
    gridRef,
    mountRange,
    visibleRange,
    topSpacerHeight: spacerHeight(topRows),
    bottomSpacerHeight: spacerHeight(bottomRows),
  };
};

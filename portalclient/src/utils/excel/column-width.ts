const MIN_WIDTH = 10;
const MAX_WIDTH = 50;
const PADDING = 2;

export function calculateColumnWidth(headerName: string, rows: Record<string, any>[]): number {
    let max = headerName.length;
    for (const row of rows) {
        const cell = row[headerName];
        const len = cell == null ? 0 : String(cell).length;
        if (len > max) max = len;
    }
    return Math.min(Math.max(max + PADDING, MIN_WIDTH), MAX_WIDTH);
}

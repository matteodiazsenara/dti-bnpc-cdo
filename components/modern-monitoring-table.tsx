"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import * as XLSX from "xlsx";

// --- Types ---
type MonitoringRow = {
  type: string;
  category: string;
  product: string;
  brand: string;
  spec: string;
  srp: string;
  [key: string]: string; // Dynamic store columns
};

// --- Helper: Convert Excel Letter to Index ---
// A=0, B=1 ... AA=26 ... DD=107
const getColIndex = (letter: string) => {
  let column = 0;
  for (let i = 0; i < letter.length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, letter.length - i - 1);
  }
  return column - 1;
};

// INDICES MAPPING
const TARGET_INDICES = [
  0,
  1,
  2,
  3,
  4,
  5, // A-F (Meta Columns)
  getColIndex("DD"),
  getColIndex("DE"),
  getColIndex("DF"), // 107, 108, 109
  getColIndex("ED"),
  getColIndex("EE"),
  getColIndex("EF"), // 133, 134, 135
];

// Helper to get Store Name from row 7 (index 7) or fallback
const getStoreName = (rawData: any[][], colIdx: number) => {
  // Try row 7 (store names)
  if (rawData[7] && rawData[7][colIdx]) return String(rawData[7][colIdx]);
  // Try row 6 (city names) if 7 is empty
  if (rawData[6] && rawData[6][colIdx]) return String(rawData[6][colIdx]);
  return `Col ${colIdx}`;
};

const parseExcel = async (file: ArrayBuffer) => {
  const wb = XLSX.read(new Uint8Array(file), { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rawData = XLSX.utils.sheet_to_json(ws, {
    header: 1,
    blankrows: false,
  }) as any[][];

  // 1. Identify Header & Data Start
  // Based on previous snippets, data usually starts around row 9 (index 8)
  // But let's look for "Basic Necessity" or "Prime Commodity" in col A to be sure
  let startRow = 8;
  for (let i = 0; i < 20; i++) {
    if (rawData[i] && String(rawData[i][0]).includes("Basic Necessity")) {
      startRow = i;
      break;
    }
  }

  // 2. Extract Specific Columns
  const data: MonitoringRow[] = [];
  const storeColumns: { key: string; name: string }[] = [];

  // Define the dynamic columns (DD-EF)
  // We skip 0-5 because they are fixed fields
  const dynamicIndices = [
    getColIndex("DD"),
    getColIndex("DE"),
    getColIndex("DF"),
    getColIndex("ED"),
    getColIndex("EE"),
    getColIndex("EF"),
  ];

  // Capture Headers for these dynamic columns
  dynamicIndices.forEach((colIdx) => {
    const storeName = getStoreName(rawData, colIdx);
    storeColumns.push({
      key: `col_${colIdx}`,
      name: storeName,
    });
  });

  // 3. Process Rows
  let lastMeta = ["", "", "", "", "", ""];

  for (let i = startRow; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row || row.length === 0) continue;

    // Fill Meta Columns (A-F)
    const currentMeta = [0, 1, 2, 3, 4, 5].map((idx) => {
      const val = row[idx];
      if (val !== undefined && val !== null && val !== "") {
        lastMeta[idx] = String(val);
        return String(val);
      }
      return lastMeta[idx];
    });

    const rowObj: MonitoringRow = {
      type: currentMeta[0],
      category: currentMeta[1],
      product: currentMeta[2],
      brand: currentMeta[3],
      spec: currentMeta[4],
      srp: currentMeta[5],
    };

    // Add Dynamic Column Data
    dynamicIndices.forEach((colIdx) => {
      const cellVal = row[colIdx];
      rowObj[`col_${colIdx}`] =
        cellVal !== undefined && cellVal !== null ? String(cellVal) : "-";
    });

    data.push(rowObj);
  }

  return { data, storeColumns };
};

export default function ModernMonitoringTable({
  filePath,
}: {
  filePath: string;
}) {
  const [data, setData] = React.useState<MonitoringRow[]>([]);
  const [columns, setColumns] = React.useState<ColumnDef<MonitoringRow>[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(filePath);
        const ab = await res.arrayBuffer();
        const { data, storeColumns } = await parseExcel(ab);

        setData(data);

        // Define Columns
        const columnHelper = createColumnHelper<MonitoringRow>();

        const baseCols = [
          columnHelper.accessor("type", {
            header: "Commodity",
            meta: { isMeta: true },
          }),
          columnHelper.accessor("category", {
            header: "Category",
            meta: { isMeta: true },
          }),
          columnHelper.accessor("product", {
            header: "Product",
            meta: { isMeta: true },
          }),
          columnHelper.accessor("brand", {
            header: "Brand",
            meta: { isMeta: true },
          }),
          columnHelper.accessor("spec", { header: "Spec" }),
          columnHelper.accessor("srp", { header: "SRP" }),
        ];

        const dynamicCols = storeColumns.map((col, index) => {
          const cycle = index % 3;
          const week = Math.floor(index / 3) + 1;
          const headerText = `W${week} - ${["MIN", "MAX", "MODE"][cycle]}`;

          return columnHelper.accessor(col.key, {
            header: headerText,
            cell: (info) => (
              <div className="text-center font-medium">
                {info.getValue() === "-" ? (
                  <span className="text-muted-foreground/30">-</span>
                ) : (
                  info.getValue()
                )}
              </div>
            ),
          });
        });

        setColumns([...baseCols, ...dynamicCols] as ColumnDef<MonitoringRow>[]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filePath]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const getRowSpan = (rowId: number, colId: string) => {
    if (!["type", "category", "product", "brand"].includes(colId)) return 1;

    const currentRow = data[rowId];
    const prevRow = data[rowId - 1];
    let isSame = false;

    if (prevRow) {
      if (colId === "type") isSame = currentRow.type === prevRow.type;
      else if (colId === "category")
        isSame =
          currentRow.category === prevRow.category &&
          currentRow.type === prevRow.type;
      else if (colId === "product")
        isSame =
          currentRow.product === prevRow.product &&
          currentRow.category === prevRow.category;
      else if (colId === "brand")
        isSame =
          currentRow.brand === prevRow.brand &&
          currentRow.product === prevRow.product;
    }

    if (isSame) return 0;

    let span = 1;
    for (let i = rowId + 1; i < data.length; i++) {
      const nextRow = data[i];
      let nextIsSame = false;
      if (colId === "type") nextIsSame = currentRow.type === nextRow.type;
      else if (colId === "category")
        nextIsSame =
          currentRow.category === nextRow.category &&
          currentRow.type === nextRow.type;
      else if (colId === "product")
        nextIsSame =
          currentRow.product === nextRow.product &&
          currentRow.category === nextRow.category;
      else if (colId === "brand")
        nextIsSame =
          currentRow.brand === nextRow.brand &&
          currentRow.product === nextRow.product;

      if (nextIsSame) span++;
      else break;
    }
    return span;
  };

  if (loading)
    return (
      <div className="rounded-md border bg-background shadow-sm overflow-hidden">
        <div className="max-h-[80vh] overflow-auto relative">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-20">
              <TableRow>
                {Array.from({ length: 12 }).map((_, i) => (
                  <TableHead key={i} className="whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: 12 }).map((_, colIndex) => (
                    <TableCell key={colIndex} className="py-4">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );

  return (
    <div className="rounded-md border bg-background shadow-sm overflow-hidden mb-[-300px]">
      <div className="max-h-[80vh] overflow-auto relative">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0 z-20">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap font-bold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/50">
                {row.getVisibleCells().map((cell) => {
                  const rowSpan = getRowSpan(row.index, cell.column.id);
                  if (rowSpan === 0) return null;
                  return (
                    <TableCell
                      key={cell.id}
                      rowSpan={rowSpan}
                      className={cn(
                        "align-top border-r transition-all",
                        ["type", "category"].includes(cell.column.id)
                          ? "bg-muted/10 font-medium text-foreground"
                          : "",
                        rowSpan > 1
                          ? "bg-background shadow-[inset_-1px_-1px_0_0_rgba(0,0,0,0.05)]"
                          : "",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-6 py-4 bg-background border-t">
        <div className="text-sm text-muted-foreground">
          {data.length === 0
            ? "No rows"
            : `${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-${Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of ${data.length} rows`}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-2 py-1 border border-input rounded-md bg-background text-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 border border-input rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 border border-input rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              {"<"}
            </button>
            <span className="text-sm text-muted-foreground px-2">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 border border-input rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              {">"}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 border border-input rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

type Stock = {
  name: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercent: number;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  peRatio: string | null;
  latestEarnings: string | null;
};

const columns: ColumnDef<Stock>[] = [
  { accessorKey: "name", header: "Stock" },
  { accessorKey: "purchasePrice", header: "Purchase Price" },
  { accessorKey: "quantity", header: "Qty" },
  { accessorKey: "investment", header: "Investment" },
  { accessorKey: "portfolioPercent", header: "Portfolio %" },
  { accessorKey: "cmp", header: "CMP" },
  { accessorKey: "presentValue", header: "Present Value" },

  {
    accessorKey: "gainLoss",
    header: "Gain/Loss",
    cell: info => {
      const value = info.getValue() as number;

      return (
        <span
          className={value >= 0 ? "text-green-600" : "text-red-600"}
        >
          {value.toFixed(2)}
        </span>
      );
    }
  },

  {
    accessorKey: "peRatio",
    header: "P/E Ratio",
    cell: info => info.getValue() || "N/A"
  },

  {
    accessorKey: "latestEarnings",
    header: "Latest Earnings",
    cell: info => info.getValue() || "N/A"
  }
];

export default function PortfolioTable({ data }: { data: Stock[] }) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="overflow-x-auto">

      <table className="min-w-full border border-gray-300">

        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="border px-3 py-2 text-left font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">

              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="border px-3 py-2"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

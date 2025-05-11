import { useState } from "react";
import { ArrowDown, ArrowUp, Circle, ListFilter, Search } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  RowSelectionState,
  SortingState,
  Table as TableDef,
} from "@tanstack/react-table";
import type { Trade } from "@/data/demo-data";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTablePaginationProps<TData extends Trade> {
  table: TableDef<TData>;
}

export function DataTablePagination<TData extends Trade>({
  table,
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation("dashboard");
  const pageCount = table.getPageCount();
  const { pageIndex } = table.getState().pagination;
  const siblings = 2;
  const startPage = Math.max(0, pageIndex - siblings);
  const endPage = Math.min(pageCount - 1, pageIndex + siblings);

  const pages: Array<number> = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between p-4">
      <Button
        variant="outline"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Circle className="text-blue-900" />
        {t("previous")}
      </Button>

      <div className="flex items-center gap-1">
        {startPage > 0 && (
          <>
            <Button
              size="sm"
              className={cn(
                pageIndex === 0 && "bg-violet-100 text-violet-600",
                "h-8 w-8 shadow-none hover:bg-violet-100 hover:text-violet-600 focus-visible:bg-violet-100 focus-visible:text-violet-600",
              )}
              onClick={() => table.setPageIndex(0)}
            >
              1
            </Button>
            {startPage > 1 && (
              <span className="px-2 text-slate-500 select-none">…</span>
            )}
          </>
        )}

        {pages.map((page) => (
          <Button
            key={page}
            size="sm"
            className={cn(
              page === pageIndex && "bg-violet-100 text-violet-600",
              "h-8 w-8 shadow-none hover:bg-violet-100 hover:text-violet-600 focus-visible:bg-violet-100 focus-visible:text-violet-600",
            )}
            onClick={() => table.setPageIndex(page)}
          >
            {page + 1}
          </Button>
        ))}

        {endPage < pageCount - 1 && (
          <>
            {endPage < pageCount - 2 && (
              <span className="px-2 text-slate-500 select-none">…</span>
            )}
            <Button
              size="sm"
              className={cn(
                pageIndex === pageCount - 1 && "bg-violet-100 text-violet-600",
                "h-8 w-8 shadow-none hover:bg-violet-100 hover:text-violet-600 focus-visible:bg-violet-100 focus-visible:text-violet-600",
              )}
              onClick={() => table.setPageIndex(pageCount - 1)}
            >
              {pageCount}
            </Button>
          </>
        )}
      </div>

      <Button
        variant="outline"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <Circle className="text-blue-900" />
        {t("next")}
      </Button>
    </div>
  );
}

interface DataTableColumnHeaderProps<TData extends Trade, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

function DataTableColumnHeader<TData extends Trade, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        size="sm"
        className="-ml-3 text-xs font-semibold shadow-none hover:bg-transparent hover:text-violet-600 focus-visible:bg-transparent focus-visible:text-violet-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4!" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4!" />
        ) : null}
      </Button>
    </div>
  );
}

interface DataTableProps<TData extends Trade, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: Array<TData>;
}

export function TradeHistoryTable<TData extends Trade, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation("dashboard");

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "deliveryDate",
      desc: true,
    },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const companyNameFilter: FilterFn<Trade> = (
    row,
    _columnId,
    filterValue: string,
  ) => {
    return row.original.company.name
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  };

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: companyNameFilter,
    state: {
      sorting,
      rowSelection,
      globalFilter,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
    enableRowSelection: true,
  });

  const switchFilter = (value: string) => {
    if (value === "all" || !value) {
      table.getColumn("trade")?.setFilterValue(null);
    }

    if (value === "buy") {
      table.getColumn("trade")?.setFilterValue("buy");
    }

    if (value === "sell") {
      table.getColumn("trade")?.setFilterValue("sell");
    }
  };

  const deliveryDates = data.map(
    (row) => new Date((row as Trade).deliveryDate),
  );
  const firstDeliveryDate = deliveryDates.length
    ? new Date(Math.min(...deliveryDates.map((d) => d.getTime())))
    : null;
  const lastDeliveryDate = deliveryDates.length
    ? new Date(Math.max(...deliveryDates.map((d) => d.getTime())))
    : null;

  return (
    <div className="flex flex-col gap-6">
      <ToggleGroup
        type="single"
        variant="outline"
        className="flex items-center gap-0 self-start text-slate-500"
        value={
          table.getColumn("trade")?.getFilterValue()
            ? (table.getColumn("trade")?.getFilterValue() as string)
            : "all"
        }
        onValueChange={(value) => switchFilter(value)}
        aria-label="Language Switcher"
      >
        <ToggleGroupItem value="all" className="rounded-r-none border-r-0">
          All Trades
        </ToggleGroupItem>

        <ToggleGroupItem value="buy" className="rounded-none">
          Buy Side
        </ToggleGroupItem>

        <ToggleGroupItem value="sell" className="rounded-l-none border-l-0">
          Sell Side
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="flex justify-between rounded-md bg-slate-100 p-2">
        <div className="relative grow">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            className="w-1/3 rounded-md border border-slate-300 bg-slate-50 px-4 py-2 pl-10 text-sm text-slate-500 shadow-xs focus:border-violet-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-slate-50">
            <Circle />
            {t("deliveryDate", { date: firstDeliveryDate })} -{" "}
            {t("deliveryDate", { date: lastDeliveryDate })}
          </Button>
          <Button variant="outline" className="bg-slate-50">
            <ListFilter />
            {t("filters")}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-300 shadow-xs">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-xs font-bold text-slate-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            typeof header.column.columnDef.header ===
                              "string" ? (
                              <DataTableColumnHeader
                                column={header.column}
                                title={header.column.columnDef.header}
                                className="text-xs font-bold text-slate-500"
                              />
                            ) : (
                              header.column.columnDef.header
                            ),
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-4"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

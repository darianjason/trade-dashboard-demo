import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Circle } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type { Trade } from "@/data/demo-data";
import { cn } from "@/lib/utils";

export function useTradeHistoryColumns(): Array<ColumnDef<Trade>> {
  const { t } = useTranslation("dashboard");
  const { lang } = useParams({
    from: "/$lang",
  });

  return useMemo<Array<ColumnDef<Trade>>>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-end">
            <Checkbox
              checked={
                table.getIsAllRowsSelected() ||
                (table.getIsSomeRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-end">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableGlobalFilter: false,
        size: 36,
      },
      {
        id: "trade",
        header: "Trade",
        filterFn: (row, _columnId, filterValue: string) => {
          if (!filterValue) return true;
          return row.original.type === filterValue;
        },
        cell: ({ row }) => {
          const trade = row.original;
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800">
                {trade.company.ticker} {trade.type.toUpperCase()}
              </span>
              <small className="text-slate-500">{trade.company.name}</small>
            </div>
          );
        },
        enableSorting: false,
        size: 500,
      },
      {
        accessorKey: "orderAmount",
        header: "Order amount",
        cell: ({ row }) => (
          <span className="text-slate-500">
            {t("orderAmount", {
              amount:
                lang === "id"
                  ? row.getValue<number>("orderAmount") * 16500
                  : row.getValue<number>("orderAmount"),
            })}
          </span>
        ),
        size: 128,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "deliveryDate",
        header: "Delivery date",
        cell: ({ row }) => (
          <span className="text-slate-500">
            {t("deliveryDate", { date: row.getValue("deliveryDate") })}
          </span>
        ),
        size: 128,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status");

          return (
            <div className="flex shrink items-center justify-between gap-2">
              <span
                className={cn(
                  "flex h-fit w-fit items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                  status === "processing" && "bg-slate-100 text-slate-600",
                  status === "success" && "bg-green-50 text-green-600",
                  status === "declined" && "bg-red-50 text-red-600",
                )}
              >
                <Circle
                  className={cn(
                    "size-2",
                    status === "processing" && "fill-slate-600 text-slate-600",
                    status === "success" && "fill-green-600 text-green-600",
                    status === "declined" && "fill-red-600 text-red-600",
                  )}
                />
                {t(status as string)}
              </span>

              <Button className="text-violet-600 underline-offset-4 shadow-none hover:bg-transparent hover:text-violet-800 hover:underline focus-visible:bg-transparent focus-visible:text-violet-800 focus-visible:underline">
                {t("view")}
              </Button>
            </div>
          );
        },
        size: 200,
      },
    ],
    [t],
  );
}

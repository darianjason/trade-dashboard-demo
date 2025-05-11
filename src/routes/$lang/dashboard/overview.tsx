import { createFileRoute } from "@tanstack/react-router";
import { CloudDownload, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { generateData } from "@/data/demo-data";
import { Button } from "@/components/ui/button";
import { TradeHistoryTable } from "@/components/dashboard/trade-history-table";
import { useTradeHistoryColumns } from "@/components/dashboard/trade-history-columns";

const RouteComponent = () => {
  const { t } = useTranslation("dashboard");
  const columns = useTradeHistoryColumns();

  const data = generateData(60);

  return (
    <div className="container flex flex-1 flex-col gap-6 self-center py-8">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{t("tradehistory")}</h1>

          <p className="text-slate-500">
            View your team's trades and transactions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <CloudDownload />
            {t("downloadcsv")}
          </Button>

          <Button
            variant="outline"
            className="bg-violet-600 text-slate-100 hover:bg-violet-700 hover:text-slate-100 focus-visible:bg-violet-700 focus-visible:text-slate-100"
          >
            <Plus />
            {t("add")}
          </Button>
        </div>
      </div>

      <TradeHistoryTable columns={columns} data={data} />
    </div>
  );
};

export const Route = createFileRoute("/$lang/dashboard/overview")({
  component: RouteComponent,
});

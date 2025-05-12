import {
  Link,
  Outlet,
  createFileRoute,
  useParams,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import i18n from "@/i18n";

const loadTranslations = async ({ params }: { params: { lang: string } }) => {
  const res = await fetch(`/locales/${params.lang}/dashboard.json`);
  if (!res.ok) throw new Error(`Missing translations for ${params.lang}`);
  const translations = await res.json();

  i18n.addResourceBundle(params.lang, "dashboard", translations);
};

const DashboardLayoutComponent = () => {
  const { lang } = useParams({
    from: "/$lang",
  });

  const { t } = useTranslation("dashboard");

  const links = [
    { to: `/${lang}/dashboard/overview`, label: t("overview") },
    { to: `/${lang}/dashboard/notifications`, label: t("notifications") },
    { to: `/${lang}/dashboard/analytics`, label: t("analytics") },
    { to: `/${lang}/dashboard/saved-reports`, label: t("savedreports") },
    { to: `/${lang}/dashboard/trade-history`, label: t("tradehistory") },
    { to: `/${lang}/dashboard/user-reports`, label: t("userreport") },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-center border-b border-b-slate-200 py-4">
        <div className="container flex items-center justify-between gap-4">
          <nav>
            <ul className="flex gap-2 text-sm text-slate-500">
              {links.map(({ to, label }) => (
                <li key={to} className="group rounded-md font-bold">
                  <Link
                    to={to}
                    className="rounded-md p-2 transition-colors group-hover:bg-violet-100 [&.active]:bg-violet-100 [&.active]:text-violet-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search"
              className="rounded-md border border-slate-300 px-4 py-2 pl-10 text-sm text-slate-500 shadow-xs focus:border-violet-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/$lang/dashboard")({
  loader: loadTranslations,
  component: DashboardLayoutComponent,
});

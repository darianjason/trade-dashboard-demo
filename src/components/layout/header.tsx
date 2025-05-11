import { Link, useParams } from "@tanstack/react-router";
import { Bell, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { t } = useTranslation("common");
  const { lang } = useParams({
    from: "/$lang",
  });

  const links = [
    { to: `/${lang}`, label: t("home"), exact: true },
    { to: `/${lang}/dashboard`, label: t("dashboard") },
    { to: `/${lang}/projects`, label: t("projects") },
    { to: `/${lang}/tasks`, label: t("tasks") },
    { to: `/${lang}/reporting`, label: t("reporting") },
    { to: `/${lang}/users`, label: t("users") },
  ];

  return (
    <header className="flex items-center justify-center border-b border-b-slate-200 px-4 py-2">
      <div className="container flex items-center justify-between gap-4">
        <nav>
          <ul className="flex gap-2 text-sm text-slate-500">
            {links.map(({ to, label, exact }) => (
              <li key={to} className="group rounded-md font-bold">
                <Link
                  to={to}
                  className="rounded-md p-2 transition-colors group-hover:bg-violet-100 [&.active]:bg-violet-100 [&.active]:text-violet-600"
                  activeOptions={{ exact }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher />

        <div className="flex items-center text-slate-500">
          <Button size="icon">
            <Settings />
          </Button>

          <Button size="icon">
            <Bell />
          </Button>
        </div>
      </div>
    </header>
  );
};

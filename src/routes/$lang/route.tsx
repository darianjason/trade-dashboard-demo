import {
  Outlet,
  createFileRoute,
  redirect,
  useParams,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { Header } from "@/components/layout/header";

const SUPPORTED_LOCALES = ["en", "id"];

const loadTranslations = async ({ params }: { params: { lang: string } }) => {
  const res = await fetch(`/locales/${params.lang}/common.json`);
  if (!res.ok) throw new Error(`Missing translations for ${params.lang}`);
  const translations = await res.json();

  i18n.addResourceBundle(params.lang, "common", translations);
};

const LangLayoutComponent = () => {
  const { lang } = useParams({
    from: "/$lang",
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="flex min-h-screen flex-1 flex-col bg-stone-50">
        <Header />
        <Outlet />
      </div>
    </I18nextProvider>
  );
};

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ location }) => {
    const path = location.pathname.split("/")[1];

    if (!SUPPORTED_LOCALES.includes(path)) {
      const detectedLocale = i18n.services.languageDetector.detect();
      const locale = SUPPORTED_LOCALES.includes(detectedLocale)
        ? detectedLocale
        : "en";

      throw redirect({ to: `/${locale}/${location.pathname}` });
    }
  },
  loader: loadTranslations,
  component: LangLayoutComponent,
});

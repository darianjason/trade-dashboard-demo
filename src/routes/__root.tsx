import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import i18n from "@/i18n";

const SUPPORTED_LOCALES = ["en", "id"];

const RootLayoutComponent = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const path = location.pathname.split("/")[1];
    const detectedLocale = i18n.services.languageDetector.detect();
    const locale = SUPPORTED_LOCALES.includes(detectedLocale)
      ? detectedLocale
      : "en";

    if (!path) {
      throw redirect({ to: `/${locale}` });
    }
  },
  component: RootLayoutComponent,
});

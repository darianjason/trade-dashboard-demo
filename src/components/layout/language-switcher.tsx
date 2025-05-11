import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const LanguageSwitcher = () => {
  const { lang } = useParams({
    from: "/$lang",
  });
  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const switchLanguage = (value: string) => {
    if (!value || value === lang) return;

    navigate({
      to: `/${value}/${pathname.split("/").slice(2).join("/")}`,
    });
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className="flex items-center gap-0 text-slate-500"
      value={lang}
      onValueChange={(value) => switchLanguage(value)}
      aria-label="Language Switcher"
    >
      <ToggleGroupItem value="en" className="rounded-r-none">
        English
      </ToggleGroupItem>

      <ToggleGroupItem value="id" className="rounded-l-none border-l-0">
        Bahasa
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

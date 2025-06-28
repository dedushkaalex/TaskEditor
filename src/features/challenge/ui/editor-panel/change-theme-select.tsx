import { THEMES } from "@/shared/ui/editor";
import { useEditor } from "@/shared/ui/editor/settings-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";

export const ChangeThemeSelect = () => {
  const { setTheme, value: theme } = useEditor((state) => state.settings.theme);

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map(({ id, label }) => (
          <SelectItem value={id} key={id}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

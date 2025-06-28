import { LANGUAGE_CONFIG, type Language } from "@/shared/ui/editor/config/settings";
import { useEditor } from "@/shared/ui/editor/settings-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";

export const ChangeLanguageSelect = () => {
  const { setLanguage, value: language } = useEditor((state) => state.settings.language);

  const handleChangeLanguage = (value: Language) => {
    setLanguage(value);
  };

  return (
    <Select value={language} onValueChange={handleChangeLanguage}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(LANGUAGE_CONFIG).map(({ id, label }) => (
          <SelectItem value={id} key={id}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

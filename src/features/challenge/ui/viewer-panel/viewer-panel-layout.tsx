import mdContent from "@/__mocks__/task.md?raw";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { Markdown } from "@/shared/ui/markdown/markdown";

const tabs = [
  {
    value: "description",
    label: "Description",
    content: <Markdown className="text-red-300">{mdContent}</Markdown>,
  },
  {
    value: "solutions",
    label: "Solutions",
    content: "Solutions",
  },
  {
    value: "submittions",
    label: "Submittions",
    content: "Submittions",
  },
];

export const ViewerPanelLayout = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-slate-800 min-h-13 px-3 py-2">Header</div>
      <Tabs className="bg-[#27272a] grow overflow-y-auto" defaultValue="description">
        <TabsList className="z-10 w-full border-y rounded-none border-y-border">
          {tabs.map(({ value, label }) => (
            <TabsTrigger value={value} className="border-none py-4" key={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(({ value, content }) => (
          <TabsContent value={value} className="px-4 overflow-y-auto scroller" key={value}>
            {content}
          </TabsContent>
        ))}
      </Tabs>
      <div>Footer</div>
    </div>
  );
};

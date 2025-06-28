import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { RotateCcw } from "lucide-react";

import { Editor } from "@/shared/ui/editor";

const ChallengePage = () => {
  return (
    <main className="grow h-screen">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20} className="border border-green-200 rounded-2xl">
          <div>Тут будет описание задачи</div>
        </Panel>
        <PanelResizeHandle className="p-1 cursor-col-resize relative group">
          <div className="group-active:bg-primary group-hover:bg-primary absolute left-1/2 top-1/2 h-1 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-400 duration-300 group-active:duration-75 lg:h-24 lg:w-1 " />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={20} className="bg-slate-800 h-full rounded-2xl">
          <div className="flex flex-col h-full">
            <div className="px-3 py-2 ml-auto min-h-8">
              <RotateCcw />
            </div>
            <div className="grow flex-1">
              <Editor />
            </div>
            <div className="px-3 py-2 min-h-8">sdf</div>
          </div>
        </Panel>
      </PanelGroup>
    </main>
  );
};

export const Component = ChallengePage;

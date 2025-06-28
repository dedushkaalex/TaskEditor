import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import mdContent from "@/__mocks__/challenges/default-generic-arguments/prompt.md?raw";
import { RotateCcw } from "lucide-react";

import { Editor } from "@/shared/ui/editor";
import { Markdown } from "@/shared/ui/markdown/markdown";

import { ChangeLanguageSelect } from "./ui/editor-panel/change-language-select";
import { ChangeThemeSelect } from "./ui/editor-panel/change-theme-select";
import { EditorPanelLayout } from "./ui/editor-panel/editor-panel-layout";

const ChallengePage = () => {
  return (
    <main className="grow h-screen">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20} className="border border-green-200 rounded-2xl">
          <div className="overflow-y-auto h-full px-4">
            <Markdown>{mdContent}</Markdown>
          </div>
        </Panel>
        <PanelResizeHandle className="p-1 cursor-col-resize relative group">
          <div className="group-active:bg-primary group-hover:bg-primary absolute left-1/2 top-1/2 h-1 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-400 duration-300 group-active:duration-75 lg:h-24 lg:w-1 " />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={20} className="bg-slate-800 h-full rounded-2xl">
          <EditorPanelLayout
            editor={<Editor />}
            headerActions={
              <>
                <ChangeThemeSelect />
                <ChangeLanguageSelect />
                <RotateCcw />
              </>
            }
          />
        </Panel>
      </PanelGroup>
    </main>
  );
};

export const Component = ChallengePage;

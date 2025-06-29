import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export const ChallengeLayout = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => {
  return (
    <main className="grow h-screen">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20} className="bg-gray-700 rounded-2xl">
          {left}
        </Panel>
        <PanelResizeHandle className="p-1 cursor-col-resize relative group">
          <div className="group-active:bg-primary group-hover:bg-primary absolute left-1/2 top-1/2 h-1 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-400 duration-300 group-active:duration-75 lg:h-24 lg:w-1 " />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={20} className="bg-slate-800 h-full rounded-2xl">
          {right}
        </Panel>
      </PanelGroup>
    </main>
  );
};

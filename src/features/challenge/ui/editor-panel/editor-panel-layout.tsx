export const EditorPanelLayout = ({
  headerActions,
  editor,
}: {
  headerActions?: React.ReactNode;
  editor: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 min-h-8 flex items-center gap-2">{headerActions}</div>
      <div className="grow flex-1">{editor}</div>
      <div className="px-3 py-2 min-h-8">sdf</div>
    </div>
  );
};

import { RotateCcw } from "lucide-react";

import { Editor } from "@/shared/ui/editor";

import { ChallengeLayout } from "./ui/challenge-layout";
import { ChangeLanguageSelect } from "./ui/editor-panel/change-language-select";
import { ChangeThemeSelect } from "./ui/editor-panel/change-theme-select";
import { EditorPanelLayout } from "./ui/editor-panel/editor-panel-layout";
import { ViewerPanelLayout } from "./ui/viewer-panel/viewer-panel-layout";

const ChallengePage = () => {
  return (
    <ChallengeLayout
      left={<ViewerPanelLayout />}
      right={
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
      }
    />
  );
};

export const Component = ChallengePage;

import { useState } from "react";

import { Check, Copy } from "lucide-react";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text).catch(console.error);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="absolute right-0">
      {isCopied ? (
        <div className="flex items-center justify-center p-3">
          <Check className="stroke-green-500 hover:stroke-green-400" size={20} />
        </div>
      ) : (
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                className="p-2 hover:bg-transparent dark:hover:bg-transparent"
                aria-label="Copy code to clipboard"
              >
                <Copy className="stroke-gray-500 hover:stroke-gray-400" size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

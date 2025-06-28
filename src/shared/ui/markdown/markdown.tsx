import { type Ref, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import clsx from "clsx";
import { Check, Copy } from "lucide-react";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import type { Plugin } from "unified";
import { SKIP, visit } from "unist-util-visit";

import { userMentions } from "@/shared/lib/mentions";

import { Button } from "../kit/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../kit/tooltip";
import { vscDarkPlus } from "./themes/vs-dark-plus";

const HTML_COMMENT_REGEX = new RegExp("<!--([\\s\\S]*?)-->", "g");

/**
 * Remove HTML comments from Markdown
 */
function removeHtmlComments(): Plugin {
  //@ts-ignore
  return (tree: any) => {
    // TODO: PRs are welcomed to fix the any type
    //@ts-ignore
    const handler = (node, index, parent) => {
      const isComment = node.value.match(HTML_COMMENT_REGEX);

      if (isComment && typeof index === "number" && parent && Array.isArray(parent.children)) {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
    };
    //@ts-ignore
    visit(tree, "html", handler);

    // TODO: is this needed
    //@ts-ignore
    visit(tree, "jsx", handler);
  };
}

export function Markdown({
  children,
  disableMentions = false,
  disableCopy = false,
}: {
  children: string;
  className?: string;
  disableMentions?: boolean;
  disableCopy?: boolean;
}) {
  return (
    <ReactMarkdown
      skipHtml
      components={{
        a: ({ className, ...props }) => <a className={clsx(className, "whitespace-nowrap text-blue-500")} {...props} />,
        ul: ({ className, ...props }) => <ul className={clsx(className, "mb-4 list-disc ps-10")} {...props} />,
        ol: ({ className, ...props }) => <ol className={clsx(className, "mb-4 list-decimal ps-10")} {...props} />,
        h1: ({ className, ...props }) => <h1 className={clsx(className, "mb-2 pb-2 text-3xl font-bold")} {...props} />,
        h2: ({ className, ...props }) => <h2 className={clsx(className, "mb-2 pb-2 text-2xl font-bold")} {...props} />,
        h3: ({ className, ...props }) => <h3 className={clsx(className, "mb-2 pb-2 text-xl font-bold")} {...props} />,
        p: ({ className, ...props }) => (
          <p className={clsx(className, "mb-4 overflow-hidden text-ellipsis")} {...props} />
        ),
        blockquote: ({ className, ...props }) => (
          <blockquote
            className={clsx(
              className,
              "mx-0 my-[10px] border-l-8 border-gray-400 bg-zinc-200 px-2 py-[10px] dark:border-gray-200 dark:bg-zinc-700 ",
            )}
            {...props}
          />
        ),
        code({ className, children, style: _, ref, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <div className="relative">
              {!disableCopy ? <CopyButton text={String(children).replace(/\n$/, "")} /> : null}
              <SyntaxHighlighter
                ref={ref as Ref<SyntaxHighlighter> | undefined}
                // TODO: react-syntax-highlighter is not react 19 compatible yet.
                // ref: https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/581
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                PreTag={"section" as any} // parent tag
                className={clsx(className, "rounded-xl dark:rounded-md")}
                language={match[1]}
                style={vscDarkPlus} // theme
                customStyle={{ fontSize: "inherit", padding: "30px" }}
                codeTagProps={{
                  style: {
                    // overrides
                    fontSize: "inherit",
                    lineHeight: "inherit",
                  },
                  // This is required make it WCAG 2 compliant for scrolling through keyboard if the code overflows and have a scrollbar
                  // https://dequeuniversity.com/rules/axe/4.8/scrollable-region-focusable
                  tabIndex: 0,
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="rounded-md border border-zinc-300 bg-neutral-200 px-1 py-[0.10rem] font-mono text-zinc-600 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
              {children}
            </code>
          );
        },
        details: ({ ...props }) => <details {...props} />,
        summary: ({ ...props }) => <summary {...props} />,
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rehypePlugins={[rehypeRaw as any, rehypeSanitize]}
      remarkPlugins={[removeHtmlComments, remarkGfm, ...(disableMentions ? [] : [userMentions])]}
    >
      {children}
    </ReactMarkdown>
  );
}

function CopyButton({ text }: { text: string }) {
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

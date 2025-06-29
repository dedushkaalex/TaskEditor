import { type Ref } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import clsx from "clsx";
import type { Html, Root } from "mdast";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import type { Plugin } from "unified";
import { SKIP, visit } from "unist-util-visit";
import type { Visitor } from "unist-util-visit";

import { userMentions } from "@/shared/lib/mentions";

import { CopyButton } from "../kit/copy-button";
import { vscDarkPlus } from "./themes/vs-dark-plus";

const HTML_COMMENT_REGEX = new RegExp("<!--([\\s\\S]*?)-->", "g");

/**
 * Remove HTML comments from Markdown
 */
function removeHtmlComments(): Plugin<[Root], Root> {
  return (tree: Root) => {
    const handler: Visitor<Html> = (node, index, parent) => {
      const isComment = node.value.match(HTML_COMMENT_REGEX);

      if (isComment && typeof index === "number" && parent && Array.isArray(parent.children)) {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
    };
    visit(tree, "html", handler);

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
                PreTag={"section"} // parent tag
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
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      remarkPlugins={[removeHtmlComments, remarkGfm, ...(disableMentions ? [] : [userMentions])]}
    >
      {children}
    </ReactMarkdown>
  );
}

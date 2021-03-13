import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import remark from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import {resolveClassNames} from "./MarkdownContentUtils";

interface IMarkdownContentProps {
    content: string;
    className?: string;
}

export function MarkdownContent(props: IMarkdownContentProps): JSX.Element {
    const { content, className } = props;
    const [appState, setAppState] = useState("");

    useEffect(() => {
        axios.get(content)
        .then(res => {
            remark()
            .use(html)
            .use(gfm)
            .process(res.data, function (err: any, file: any): void {
                const convertedHTML: any = file.contents;
                setAppState(convertedHTML);
            });
        });
      }, [content]);

    return (
          <div data-testid="MARKDOWN_CONTENT_CONTAINER" className={resolveClassNames(className)}>
            {ReactHtmlParser(appState)}
          </div>
    );
}


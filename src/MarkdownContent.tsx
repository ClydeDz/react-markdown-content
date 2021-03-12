import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import remark from "remark";
import html from "remark-html";

interface IMarkdownContentProps {
    content: string;
}

function MarkdownContent(props: IMarkdownContentProps): JSX.Element {
    const { content } = props;
    const [appState, setAppState] = useState("");

    useEffect(() => {
        axios.get(content)
        .then(res => {
            remark()
            .use(html)
            .process(res.data, function (err: any, file: any): void {
                const convertedHTML: any = file.contents;
                setAppState(convertedHTML);
            });
        });
      }, [content]);

    return (
          <div data-testid="mdcontent">
            {ReactHtmlParser(appState)}
          </div>
    );
};

export default MarkdownContent;
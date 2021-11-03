import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Markdown = ({markdown}) => {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm, {tableCellPadding: false}]}>
            {markdown}
        </ReactMarkdown>
    )
}

export default Markdown;
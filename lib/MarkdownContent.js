"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_html_parser_1 = __importDefault(require("react-html-parser"));
const remark_1 = __importDefault(require("remark"));
const remark_html_1 = __importDefault(require("remark-html"));
function MarkdownContent(props) {
    const { content } = props;
    const [appState, setAppState] = react_1.useState("");
    react_1.useEffect(() => {
        axios_1.default.get(content)
            .then(res => {
            remark_1.default()
                .use(remark_html_1.default)
                .process(res.data, function (err, file) {
                const convertedHTML = file.contents;
                setAppState(convertedHTML);
            });
        });
    }, [content]);
    return (react_1.default.createElement(react_1.default.Fragment, null, react_html_parser_1.default(appState)));
}
;
exports.default = MarkdownContent;

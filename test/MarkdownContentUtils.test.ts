import {resolveClassNames} from "../src/MarkdownContentUtils";

describe("resolveClassNames", () => {
    it.each([
        ["", "markdown-content-container"],
        ["custom-opera", "markdown-content-container custom-opera"],
        ["adam-spacing ", "markdown-content-container adam-spacing"],
        [" major-missing ", "markdown-content-container major-missing"],
    ])("should match the snapshot", (input, expected) => {
        const classNames = resolveClassNames(input);
        expect(classNames).toBe(expected);
    });
});

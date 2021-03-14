import "@testing-library/jest-dom/extend-expect";
import {act, cleanup, render, screen} from "@testing-library/react";
import axios from "axios";
import React from "react";
import {MarkdownContent} from "../src/MarkdownContent";
import { GetTestFixture, TestFixtures, TestFixtureResults } from "./fixtures/GetTestFixtures";

const mockedAxios = axios as jest.Mocked<typeof axios>;
const TEST_ID = "MARKDOWN_CONTENT_CONTAINER";
const removeLinebreaksTabsSpaces = (unformattedString: string) => {
    if (!unformattedString) {
        return "";
    }
    return unformattedString.replace(/\s\s+/g, "");
};

jest.mock("axios");
afterEach(cleanup);

describe("<MarkdownContent />", () => {
    it("should match the snapshot", async () => {
        const res = {data: GetTestFixture(TestFixtures.SIMPLE)};
        mockedAxios.get.mockResolvedValue(res);

        let renderedComponent;
        await act(async () => {
            renderedComponent = render(<MarkdownContent markdownFilePath="" />);
        });

        expect(renderedComponent).toMatchSnapshot();
    });

    it("should match the snapshot when classname is provided", async () => {
        const res = {data: GetTestFixture(TestFixtures.SIMPLE)};
        mockedAxios.get.mockResolvedValue(res);

        let renderedComponent;
        await act(async () => {
            renderedComponent = render(<MarkdownContent markdownFilePath="" className="xyz"/>);
        });

        expect(renderedComponent).toMatchSnapshot();
    });

    it("should match the snapshot when no markdown is passed", async () => {
        const res = {data: ""};
        mockedAxios.get.mockResolvedValue(res);

        let renderedComponent;
        await act(async () => {
            renderedComponent = render(<MarkdownContent markdownFilePath="" />);
        });

        expect(renderedComponent).toMatchSnapshot();
    });

    it("should have the class name passed via props", async () => {
        const res = {data: "# About"};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent markdownFilePath="" className="xyz"/>);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(linkElement).toHaveClass("markdown-content-container xyz");
    });

    it("should have default class name if no class is passed via props", async () => {
        const res = {data: "# About"};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent markdownFilePath="" />);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(linkElement).toHaveClass("markdown-content-container");
    });

    it("shouldn't contain any HTML when no markdown content is passed", async () => {
        const res = {data: ""};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent markdownFilePath="" />);
        });

        expect(await screen.queryByTestId(TEST_ID)).toBeNull();
    });

    it("should log a console warning if there is an error with axios", async () => {
        const res = {response: {data: "Invalid file path"}};
        mockedAxios.get.mockRejectedValue(res);
        const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

        await act(async () => {
            render(<MarkdownContent markdownFilePath="../test/fixtures/simple.md" />);
        });
        expect(console.warn).toBeCalledTimes(1);
        expect(await screen.queryByTestId(TEST_ID)).toBeNull();
        consoleSpy.mockClear();
    });

    it.each([
        [TestFixtures.SIMPLE, TestFixtureResults.SIMPLE],
        [TestFixtures.LINKS, TestFixtureResults.LINKS],
        [TestFixtures.GFM_CHECKLIST, TestFixtureResults.GFM_CHECKLIST],
        [TestFixtures.GFM_FORMATS, TestFixtureResults.GFM_FORMATS],
        [TestFixtures.GFM_TABLE, TestFixtureResults.GFM_TABLE],
        [TestFixtures.CODE, TestFixtureResults.CODE],
        [TestFixtures.INLINE_HTML, TestFixtureResults.INLINE_HTML],
        [TestFixtures.HEADING, TestFixtureResults.HEADING],
        [TestFixtures.HORIZONTAL_RULE, TestFixtureResults.HORIZONTAL_RULE],
    ])("should process markdown from %s and produce correct HTML", async (input, expected) => {
        const res = {data: GetTestFixture(input)};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent markdownFilePath="" />);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(removeLinebreaksTabsSpaces(linkElement.innerHTML))
            .toBe(removeLinebreaksTabsSpaces(expected));
    });
});

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
            renderedComponent = render(<MarkdownContent content="" />);
        });

        expect(renderedComponent).toMatchSnapshot();
    });

    it("should have the class name passed via props", async () => {
        const res = {data: ""};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent content="" className="xyz"/>);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(linkElement).toHaveClass("markdown-content-container xyz");
    });

    it("should have default class name if no class is passed via props", async () => {
        const res = {data: ""};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent content="" />);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(linkElement).toHaveClass("markdown-content-container");
    });

    it("shouldn't contain any HTML when no markdown content is passed", async () => {
        const res = {data: ""};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent content="" />);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(linkElement.innerHTML).toBe("");
    });

    it.each([
        [TestFixtures.SIMPLE, TestFixtureResults.SIMPLE],
        [TestFixtures.LINKS, TestFixtureResults.LINKS],
        [TestFixtures.GFM_CHECKLIST, TestFixtureResults.GFM_CHECKLIST],
        [TestFixtures.GFM_FORMATS, TestFixtureResults.GFM_FORMATS],
        [TestFixtures.GFM_TABLE, TestFixtureResults.GFM_TABLE],
        [TestFixtures.CODE, TestFixtureResults.CODE],
        [TestFixtures.INLINE_HTML, TestFixtureResults.INLINE_HTML],
    ])("should process markdown from %s and produce correct HTML", async (input, expected) => {
        const res = {data: GetTestFixture(input)};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent content="" />);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(removeLinebreaksTabsSpaces(linkElement.innerHTML))
            .toBe(removeLinebreaksTabsSpaces(expected));
    });
});

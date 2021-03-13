import "@testing-library/jest-dom/extend-expect";
import {act, cleanup, render, screen} from "@testing-library/react";
import axios from "axios";
import React from "react";
import {MarkdownContent} from "../src/MarkdownContent";
import { GetTestFixture, TestFixtures, TestFixtureResults } from "./fixtures/GetTestFixtures";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const TEST_ID = "MARKDOWN_CONTENT_CONTAINER";

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
    ])("should process markdown from %s and produce correct HTML", async (input, expected) => {
        const res = {data: GetTestFixture(input)};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent content="" />);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(linkElement.innerHTML).toBe(expected);
    });
});

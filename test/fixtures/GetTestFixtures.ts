import fs from "fs";

export enum TestFixtureResults {
    SIMPLE = "<h2>About</h2><p>This is a <em>simple</em> <strong>markdown</strong> file.</p>",
    LINKS = "<p><a href=\"http://example.com\">Link</a> <a href=\"http://exampletwo.com\">Link two</a></p>",
}

export enum TestFixtures {
    SIMPLE = "simple.md",
    LINKS = "link.md",
}

export const GetTestFixture = (fixtureName: TestFixtures) => {
    return fs.readFileSync(`./test/fixtures/${fixtureName}`, "utf8");
};

export default GetTestFixture;


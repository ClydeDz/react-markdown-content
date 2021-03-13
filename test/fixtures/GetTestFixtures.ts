import fs from "fs";

export enum TestFixtureResults {
    SIMPLE = "<h2>About</h2><p>This is a <em>simple</em> <strong>markdown</strong> file.</p>",
    LINKS = "<p><a href=\"http://example.com\">Link</a> <a href=\"http://exampletwo.com\">Link two</a></p>",
    GFM_CHECKLIST = `<h2>Todo</h2><ul class="contains-task-list"><li class="task-list-item">
        <input type="checkbox" disabled=""> Something</li><li class="task-list-item">
        <input type="checkbox" disabled="" checked=""> Another thing</li></ul>`,
    GFM_FORMATS = `<p>The <del>quick</del> slow brown fox jumped over the <del>lazy</del> active dog.</p>
        <p>Visit <a href=\"http://www.google.com\">www.google.com</a></p>`,
    CODE = `<h3>Regular code block</h3><pre><code>Console.WriteLine("Hello world);
    </code></pre><h3>Language formatted code block</h3><pre>
    <code class="language-csharp">Console.WriteLine("Hello world);</code></pre>`,
    GFM_TABLE = `<table><thead><tr><th>Name</th><th align=\"left\">Order</th><th align=\"right\">Owes</th></tr></thead>
        <tbody><tr><td>Joan</td><td align=\"left\">Apples</td><td align=\"right\">$11</td></tr><tr><td>Sally</td>
        <td align=\"left\">Banana</td><td align=\"right\">$14</td></tr><tr><td>Erin</td><td align=\"left\">Orange</td>
        <td align=\"right\">$5</td></tr></tbody></table>`,
    INLINE_HTML = `<p>Some image<img src=\"https://ui-avatars.com/api/?name=john%20doe\"></p>`,
    HORIZONTAL_RULE = `<p>Horizontal rule</p><hr>`,
    HEADING = `<h2>Heading</h2>`,
}

export enum TestFixtures {
    SIMPLE = "simple.md",
    LINKS = "link.md",
    GFM_CHECKLIST = "gfm-checklist.md",
    CODE = "code.md",
    GFM_FORMATS = "gfm-format.md",
    GFM_TABLE = "gfm-table.md",
    INLINE_HTML = "inline-html.md",
    HORIZONTAL_RULE = "horizontal-rule.md",
    HEADING = "heading.md",
}

export const GetTestFixture = (fixtureName: TestFixtures) => {
    return fs.readFileSync(`./test/fixtures/${fixtureName}`, "utf8");
};

export default GetTestFixture;

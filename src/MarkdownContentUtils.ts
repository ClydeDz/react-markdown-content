export const resolveClassNames = (classname?: string) => {
    const classes = `markdown-content-container ${classname ? classname.trim() : ""}`;
    return classes.trim();
};

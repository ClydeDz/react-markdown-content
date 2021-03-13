"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveClassNames = void 0;
const resolveClassNames = (classname) => {
    const classes = `markdown-content-container ${classname ? classname.trim() : ""}`;
    return classes.trim();
};
exports.resolveClassNames = resolveClassNames;

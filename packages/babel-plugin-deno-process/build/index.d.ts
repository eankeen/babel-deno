export default function declare(api: any, options: any): {
    name: string;
    visitor: {
        ImportDeclaration: (path: any) => void;
        CallExpression: (path: any) => void;
    };
};
//# sourceMappingURL=index.d.ts.map
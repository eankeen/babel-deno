export declare function info(text: string, ...args: any[]): void;
declare type debugFn = (text: string) => void;
export declare function warn(debug: debugFn, text: string, ...args: any[]): void;
export declare function error(debug: debugFn, text: string, ...args: any[]): void;
export {};
//# sourceMappingURL=log.d.ts.map
import { EntryPointConfig, CompilationOptions } from "dts-bundle-generator";
import EventEmitter from "node:events";
import { Compiler, WebpackPluginInstance } from "webpack";
/**The options available for configuring the plugin.
 * Most of these come from `dts-bundle-generator`.
 */
export interface Options {
    /**The typescript entrypoint(s) to be included in the .d.ts bundle output.
     * `dts-bundle-generator`'s EntryPointConfig may be used for greater control.
     * The value is optional; when omitted the typescript entry files of the webpack bundle will be used.
     * @default DefaultEntryOptions */
    entry?: string | EntryPointConfig | ReadonlyArray<string | EntryPointConfig>;
    /**The output filename including the extension*/
    outFile: string;
    /**The compiler option overrides to be passed to `dts-bundle-generator`.*/
    compilationOptions?: CompilationOptions;
    /**Remove empty and whitespace lines from the output.*/
    removeEmptyLines?: boolean;
    /**Remove empty `export {}`s from the output.*/
    removeEmptyExports?: boolean;
    /**Remove `export * from "./somemodule"` relative re-exporting; this was added to work around a bug in `dts-bundle-generator`
     * whereby re-exporting would lead to both the relative and qualified paths being included. */
    removeRelativeReExport?: boolean;
    /**Override `.d.ts` bundling to run as part of the webpack compilation process in webpack's watch mode (slower but no false positives)  */
    blockingWatch?: boolean;
}
/**Provides the default plugin options if omitted or partially omitted.*/
export const DefaultOptions: Options;
/**Provides the default entry point config for entries which have no overrides provided. */
export const DefaultEntryOptions: Partial<EntryPointConfig>;
/** Generate the bundle content based on the options provided.
 * @param entries The typescript entrypoint details.
 * @param options The remaining configuration to be used.
 * @returns A buffer of the .d.ts file content.
 */
export function compile(entries: EntryPointConfig[], { compilationOptions, removeEmptyExports, removeEmptyLines, removeRelativeReExport }: Omit<Options, "entry" | "outFile">): Promise<Buffer>;
export const PLUGIN_NAME = "BundleDeclarationsWebpackPlugin";
/**Creates a bundled d.ts file from the entry point provided after webpack emits output.
 * @class
 * @implements {WebpackPluginInstance}
 */
export default class BundleDeclarationsWebpackPlugin extends EventEmitter implements WebpackPluginInstance {
    /**The plugin options with defaults applied.*/
    protected readonly _options: Options;
    /**Create a new instance of the plugin.
     * @param options The optional configuration to be used by the instance.
     */
    constructor(options?: Partial<Options>);
    /**@inheritdoc */
    apply(compiler: Compiler): void;
}
export type { CompilationOptions, EntryPointConfig } from "dts-bundle-generator";

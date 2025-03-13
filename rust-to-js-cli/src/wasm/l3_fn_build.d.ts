/**
* # Variants
* 
* ## `"node"`
* 
* ## `"python"`
*/
export type Runtime = 'node' | 'python';
export interface FnParseSpec {
  entrypoint: string,
  projectDir: string,
  runtime: Runtime,
}
/**
* # Variants
* 
* ## `"required"`
* 
* ## `"unused"`
*/
export type FnDependencies = 'required' | 'unused';
/**
* # Variants
* 
* ## `"get"`
* 
* ## `"delete"`
* 
* ## `"patch"`
* 
* ## `"post"`
* 
* ## `"put"`
*/
export type HttpMethod = 'get' | 'delete' | 'patch' | 'post' | 'put';
export interface HttpRoute {
  method: HttpMethod,
  path: string,
}
export type FnRouting = FnRoutingHttpRoute | FnRoutingUnsupported;
export interface FnRoutingHttpRoute {
  tag: 'http-route',
  val: HttpRoute,
}
export interface FnRoutingUnsupported {
  tag: 'unsupported',
}
export interface FnHandler {
  fnName: string,
  routing: FnRouting,
}
export interface FnEntrypoint {
  handlers: Array<FnHandler>,
  path: string,
}
export interface DependencyImport {
  'package': string,
  subpath?: string,
}
export type ModuleImport = ModuleImportPackageDependency | ModuleImportRelativeSource | ModuleImportUnknown;
export interface ModuleImportPackageDependency {
  tag: 'package-dependency',
  val: DependencyImport,
}
export interface ModuleImportRelativeSource {
  tag: 'relative-source',
  val: string,
}
export interface ModuleImportUnknown {
  tag: 'unknown',
  val: string,
}
export interface FnSource {
  imports: Array<ModuleImport>,
  path: string,
}
export interface FnParseManifest {
  dependencies: FnDependencies,
  entrypoint: FnEntrypoint,
  sources: Array<FnSource>,
}
import { WasiCliEnvironment } from './interfaces/wasi-cli-environment.js';
import { WasiCliExit } from './interfaces/wasi-cli-exit.js';
import { WasiCliStderr } from './interfaces/wasi-cli-stderr.js';
import { WasiCliStdin } from './interfaces/wasi-cli-stdin.js';
import { WasiCliStdout } from './interfaces/wasi-cli-stdout.js';
import { WasiCliTerminalInput } from './interfaces/wasi-cli-terminal-input.js';
import { WasiCliTerminalOutput } from './interfaces/wasi-cli-terminal-output.js';
import { WasiCliTerminalStderr } from './interfaces/wasi-cli-terminal-stderr.js';
import { WasiCliTerminalStdin } from './interfaces/wasi-cli-terminal-stdin.js';
import { WasiCliTerminalStdout } from './interfaces/wasi-cli-terminal-stdout.js';
import { WasiClocksMonotonicClock } from './interfaces/wasi-clocks-monotonic-clock.js';
import { WasiClocksWallClock } from './interfaces/wasi-clocks-wall-clock.js';
import { WasiFilesystemPreopens } from './interfaces/wasi-filesystem-preopens.js';
import { WasiFilesystemTypes } from './interfaces/wasi-filesystem-types.js';
import { WasiIoError } from './interfaces/wasi-io-error.js';
import { WasiIoPoll } from './interfaces/wasi-io-poll.js';
import { WasiIoStreams } from './interfaces/wasi-io-streams.js';
import { WasiRandomRandom } from './interfaces/wasi-random-random.js';
import { WasiSocketsTcp } from './interfaces/wasi-sockets-tcp.js';
import { WasiSocketsUdp } from './interfaces/wasi-sockets-udp.js';
export function parseEntrypoint(spec: FnParseSpec): FnEntrypoint;
export function parseFn(spec: FnParseSpec): FnParseManifest;

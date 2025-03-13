import { environment, exit as exit$1, stderr, stdin, stdout, terminalInput, terminalOutput, terminalStderr, terminalStdin, terminalStdout } from '@bytecodealliance/preview2-shim/cli';
import { monotonicClock, wallClock } from '@bytecodealliance/preview2-shim/clocks';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { error, poll as poll$1, streams } from '@bytecodealliance/preview2-shim/io';
import { random } from '@bytecodealliance/preview2-shim/random';
const { getEnvironment } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { TerminalInput } = terminalInput;
const { TerminalOutput } = terminalOutput;
const { getTerminalStderr } = terminalStderr;
const { getTerminalStdin } = terminalStdin;
const { getTerminalStdout } = terminalStdout;
const { now,
  subscribeDuration,
  subscribeInstant } = monotonicClock;
const { now: now$1 } = wallClock;
const { getDirectories } = preopens;
const { Descriptor,
  filesystemErrorCode } = types;
const { Error: Error$1 } = error;
const { Pollable,
  poll } = poll$1;
const { InputStream,
  OutputStream } = streams;
const { getRandomBytes } = random;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let curResourceBorrows = [];

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('node:fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  if (e instanceof Error) throw e;
  return e;
}

const handleTables = [];

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const T_FLAG = 1 << 30;

function rscTableCreateOwn (table, rep) {
  const free = table[0] & ~T_FLAG;
  if (free === 0) {
    table.push(0);
    table.push(rep | T_FLAG);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = 0;
  table[(free << 1) + 1] = rep | T_FLAG;
  return free;
}

function rscTableRemove (table, handle) {
  const scope = table[handle << 1];
  const val = table[(handle << 1) + 1];
  const own = (val & T_FLAG) !== 0;
  const rep = val & ~T_FLAG;
  if (val === 0 || (scope & T_FLAG) !== 0) throw new TypeError('Invalid handle');
  table[handle << 1] = table[0] | T_FLAG;
  table[0] = handle | T_FLAG;
  return { rep, scope, own };
}

const symbolCabiDispose = Symbol.for('cabiDispose');

const symbolRscHandle = Symbol('handle');

const symbolRscRep = Symbol.for('cabiRep');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let buf = utf8Encoder.encode(s);
  let ptr = realloc(0, 0, 1, buf.length);
  new Uint8Array(memory.buffer).set(buf, ptr);
  utf8EncodedLen = buf.length;
  return ptr;
}


let exports0;
let exports1;

function trampoline7() {
  const ret = now();
  return toUint64(ret);
}
const handleTable2 = [T_FLAG, 0];
const captureTable2= new Map();
let captureCnt2 = 0;
handleTables[2] = handleTable2;
const handleTable1 = [T_FLAG, 0];
const captureTable1= new Map();
let captureCnt1 = 0;
handleTables[1] = handleTable1;

function trampoline11(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle3;
}
const handleTable3 = [T_FLAG, 0];
const captureTable3= new Map();
let captureCnt3 = 0;
handleTables[3] = handleTable3;

function trampoline12(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle3;
}

function trampoline13(arg0) {
  const ret = subscribeDuration(BigInt.asUintN(64, arg0));
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle0;
}

function trampoline14(arg0) {
  const ret = subscribeInstant(BigInt.asUintN(64, arg0));
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle0;
}

function trampoline15() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable3, rep);
  }
  return handle0;
}

function trampoline18() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable2, rep);
  }
  return handle0;
}

function trampoline19() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable3, rep);
  }
  return handle0;
}

function trampoline20(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}
let exports2;
let memory0;
let realloc0;

function trampoline21(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline22(arg0) {
  const ret = now$1();
  var {seconds: v0_0, nanoseconds: v0_1 } = ret;
  dataView(memory0).setBigInt64(arg0 + 0, toUint64(v0_0), true);
  dataView(memory0).setInt32(arg0 + 8, toUint32(v0_1), true);
}
const handleTable0 = [T_FLAG, 0];
const captureTable0= new Map();
let captureCnt0 = 0;
handleTables[0] = handleTable0;

function trampoline23(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = filesystemErrorCode(rsc0);
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val3 = e;
    let enum3;
    switch (val3) {
      case 'access': {
        enum3 = 0;
        break;
      }
      case 'would-block': {
        enum3 = 1;
        break;
      }
      case 'already': {
        enum3 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum3 = 3;
        break;
      }
      case 'busy': {
        enum3 = 4;
        break;
      }
      case 'deadlock': {
        enum3 = 5;
        break;
      }
      case 'quota': {
        enum3 = 6;
        break;
      }
      case 'exist': {
        enum3 = 7;
        break;
      }
      case 'file-too-large': {
        enum3 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum3 = 9;
        break;
      }
      case 'in-progress': {
        enum3 = 10;
        break;
      }
      case 'interrupted': {
        enum3 = 11;
        break;
      }
      case 'invalid': {
        enum3 = 12;
        break;
      }
      case 'io': {
        enum3 = 13;
        break;
      }
      case 'is-directory': {
        enum3 = 14;
        break;
      }
      case 'loop': {
        enum3 = 15;
        break;
      }
      case 'too-many-links': {
        enum3 = 16;
        break;
      }
      case 'message-size': {
        enum3 = 17;
        break;
      }
      case 'name-too-long': {
        enum3 = 18;
        break;
      }
      case 'no-device': {
        enum3 = 19;
        break;
      }
      case 'no-entry': {
        enum3 = 20;
        break;
      }
      case 'no-lock': {
        enum3 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum3 = 22;
        break;
      }
      case 'insufficient-space': {
        enum3 = 23;
        break;
      }
      case 'not-directory': {
        enum3 = 24;
        break;
      }
      case 'not-empty': {
        enum3 = 25;
        break;
      }
      case 'not-recoverable': {
        enum3 = 26;
        break;
      }
      case 'unsupported': {
        enum3 = 27;
        break;
      }
      case 'no-tty': {
        enum3 = 28;
        break;
      }
      case 'no-such-device': {
        enum3 = 29;
        break;
      }
      case 'overflow': {
        enum3 = 30;
        break;
      }
      case 'not-permitted': {
        enum3 = 31;
        break;
      }
      case 'pipe': {
        enum3 = 32;
        break;
      }
      case 'read-only': {
        enum3 = 33;
        break;
      }
      case 'invalid-seek': {
        enum3 = 34;
        break;
      }
      case 'text-file-busy': {
        enum3 = 35;
        break;
      }
      case 'cross-device': {
        enum3 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val3}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum3, true);
  }
}
const handleTable6 = [T_FLAG, 0];
const captureTable6= new Map();
let captureCnt6 = 0;
handleTables[6] = handleTable6;

function trampoline24(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.statAt(flags3, result4)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant14 = ret;
  switch (variant14.tag) {
    case 'ok': {
      const e = variant14.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      var {type: v5_0, linkCount: v5_1, size: v5_2, dataAccessTimestamp: v5_3, dataModificationTimestamp: v5_4, statusChangeTimestamp: v5_5 } = e;
      var val6 = v5_0;
      let enum6;
      switch (val6) {
        case 'unknown': {
          enum6 = 0;
          break;
        }
        case 'block-device': {
          enum6 = 1;
          break;
        }
        case 'character-device': {
          enum6 = 2;
          break;
        }
        case 'directory': {
          enum6 = 3;
          break;
        }
        case 'fifo': {
          enum6 = 4;
          break;
        }
        case 'symbolic-link': {
          enum6 = 5;
          break;
        }
        case 'regular-file': {
          enum6 = 6;
          break;
        }
        case 'socket': {
          enum6 = 7;
          break;
        }
        default: {
          if ((v5_0) instanceof Error) {
            console.error(v5_0);
          }
          
          throw new TypeError(`"${val6}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum6, true);
      dataView(memory0).setBigInt64(arg4 + 16, toUint64(v5_1), true);
      dataView(memory0).setBigInt64(arg4 + 24, toUint64(v5_2), true);
      var variant8 = v5_3;
      if (variant8 === null || variant8=== undefined) {
        dataView(memory0).setInt8(arg4 + 32, 0, true);
      } else {
        const e = variant8;
        dataView(memory0).setInt8(arg4 + 32, 1, true);
        var {seconds: v7_0, nanoseconds: v7_1 } = e;
        dataView(memory0).setBigInt64(arg4 + 40, toUint64(v7_0), true);
        dataView(memory0).setInt32(arg4 + 48, toUint32(v7_1), true);
      }
      var variant10 = v5_4;
      if (variant10 === null || variant10=== undefined) {
        dataView(memory0).setInt8(arg4 + 56, 0, true);
      } else {
        const e = variant10;
        dataView(memory0).setInt8(arg4 + 56, 1, true);
        var {seconds: v9_0, nanoseconds: v9_1 } = e;
        dataView(memory0).setBigInt64(arg4 + 64, toUint64(v9_0), true);
        dataView(memory0).setInt32(arg4 + 72, toUint32(v9_1), true);
      }
      var variant12 = v5_5;
      if (variant12 === null || variant12=== undefined) {
        dataView(memory0).setInt8(arg4 + 80, 0, true);
      } else {
        const e = variant12;
        dataView(memory0).setInt8(arg4 + 80, 1, true);
        var {seconds: v11_0, nanoseconds: v11_1 } = e;
        dataView(memory0).setBigInt64(arg4 + 88, toUint64(v11_0), true);
        dataView(memory0).setInt32(arg4 + 96, toUint32(v11_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant14.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val13 = e;
      let enum13;
      switch (val13) {
        case 'access': {
          enum13 = 0;
          break;
        }
        case 'would-block': {
          enum13 = 1;
          break;
        }
        case 'already': {
          enum13 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum13 = 3;
          break;
        }
        case 'busy': {
          enum13 = 4;
          break;
        }
        case 'deadlock': {
          enum13 = 5;
          break;
        }
        case 'quota': {
          enum13 = 6;
          break;
        }
        case 'exist': {
          enum13 = 7;
          break;
        }
        case 'file-too-large': {
          enum13 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum13 = 9;
          break;
        }
        case 'in-progress': {
          enum13 = 10;
          break;
        }
        case 'interrupted': {
          enum13 = 11;
          break;
        }
        case 'invalid': {
          enum13 = 12;
          break;
        }
        case 'io': {
          enum13 = 13;
          break;
        }
        case 'is-directory': {
          enum13 = 14;
          break;
        }
        case 'loop': {
          enum13 = 15;
          break;
        }
        case 'too-many-links': {
          enum13 = 16;
          break;
        }
        case 'message-size': {
          enum13 = 17;
          break;
        }
        case 'name-too-long': {
          enum13 = 18;
          break;
        }
        case 'no-device': {
          enum13 = 19;
          break;
        }
        case 'no-entry': {
          enum13 = 20;
          break;
        }
        case 'no-lock': {
          enum13 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum13 = 22;
          break;
        }
        case 'insufficient-space': {
          enum13 = 23;
          break;
        }
        case 'not-directory': {
          enum13 = 24;
          break;
        }
        case 'not-empty': {
          enum13 = 25;
          break;
        }
        case 'not-recoverable': {
          enum13 = 26;
          break;
        }
        case 'unsupported': {
          enum13 = 27;
          break;
        }
        case 'no-tty': {
          enum13 = 28;
          break;
        }
        case 'no-such-device': {
          enum13 = 29;
          break;
        }
        case 'overflow': {
          enum13 = 30;
          break;
        }
        case 'not-permitted': {
          enum13 = 31;
          break;
        }
        case 'pipe': {
          enum13 = 32;
          break;
        }
        case 'read-only': {
          enum13 = 33;
          break;
        }
        case 'invalid-seek': {
          enum13 = 34;
          break;
        }
        case 'text-file-busy': {
          enum13 = 35;
          break;
        }
        case 'cross-device': {
          enum13 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val13}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum13, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline25(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  if ((arg4 & 4294967280) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags5 = {
    create: Boolean(arg4 & 1),
    directory: Boolean(arg4 & 2),
    exclusive: Boolean(arg4 & 4),
    truncate: Boolean(arg4 & 8),
  };
  if ((arg5 & 4294967232) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags6 = {
    read: Boolean(arg5 & 1),
    write: Boolean(arg5 & 2),
    fileIntegritySync: Boolean(arg5 & 4),
    dataIntegritySync: Boolean(arg5 & 8),
    requestedWriteSync: Boolean(arg5 & 16),
    mutateDirectory: Boolean(arg5 & 32),
  };
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.openAt(flags3, result4, flags5, flags6)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 0, true);
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle7 = e[symbolRscHandle];
      if (!handle7) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle7 = rscTableCreateOwn(handleTable6, rep);
      }
      dataView(memory0).setInt32(arg6 + 4, handle7, true);
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'access': {
          enum8 = 0;
          break;
        }
        case 'would-block': {
          enum8 = 1;
          break;
        }
        case 'already': {
          enum8 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum8 = 3;
          break;
        }
        case 'busy': {
          enum8 = 4;
          break;
        }
        case 'deadlock': {
          enum8 = 5;
          break;
        }
        case 'quota': {
          enum8 = 6;
          break;
        }
        case 'exist': {
          enum8 = 7;
          break;
        }
        case 'file-too-large': {
          enum8 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum8 = 9;
          break;
        }
        case 'in-progress': {
          enum8 = 10;
          break;
        }
        case 'interrupted': {
          enum8 = 11;
          break;
        }
        case 'invalid': {
          enum8 = 12;
          break;
        }
        case 'io': {
          enum8 = 13;
          break;
        }
        case 'is-directory': {
          enum8 = 14;
          break;
        }
        case 'loop': {
          enum8 = 15;
          break;
        }
        case 'too-many-links': {
          enum8 = 16;
          break;
        }
        case 'message-size': {
          enum8 = 17;
          break;
        }
        case 'name-too-long': {
          enum8 = 18;
          break;
        }
        case 'no-device': {
          enum8 = 19;
          break;
        }
        case 'no-entry': {
          enum8 = 20;
          break;
        }
        case 'no-lock': {
          enum8 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum8 = 22;
          break;
        }
        case 'insufficient-space': {
          enum8 = 23;
          break;
        }
        case 'not-directory': {
          enum8 = 24;
          break;
        }
        case 'not-empty': {
          enum8 = 25;
          break;
        }
        case 'not-recoverable': {
          enum8 = 26;
          break;
        }
        case 'unsupported': {
          enum8 = 27;
          break;
        }
        case 'no-tty': {
          enum8 = 28;
          break;
        }
        case 'no-such-device': {
          enum8 = 29;
          break;
        }
        case 'overflow': {
          enum8 = 30;
          break;
        }
        case 'not-permitted': {
          enum8 = 31;
          break;
        }
        case 'pipe': {
          enum8 = 32;
          break;
        }
        case 'read-only': {
          enum8 = 33;
          break;
        }
        case 'invalid-seek': {
          enum8 = 34;
          break;
        }
        case 'text-file-busy': {
          enum8 = 35;
          break;
        }
        case 'cross-device': {
          enum8 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg6 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline26(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.readViaStream(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable2, rep);
      }
      dataView(memory0).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline27(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.writeViaStream(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable3, rep);
      }
      dataView(memory0).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline28(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.appendViaStream()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable3, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline29(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.getType()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline30(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.stat()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant12 = ret;
  switch (variant12.tag) {
    case 'ok': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v3_0, linkCount: v3_1, size: v3_2, dataAccessTimestamp: v3_3, dataModificationTimestamp: v3_4, statusChangeTimestamp: v3_5 } = e;
      var val4 = v3_0;
      let enum4;
      switch (val4) {
        case 'unknown': {
          enum4 = 0;
          break;
        }
        case 'block-device': {
          enum4 = 1;
          break;
        }
        case 'character-device': {
          enum4 = 2;
          break;
        }
        case 'directory': {
          enum4 = 3;
          break;
        }
        case 'fifo': {
          enum4 = 4;
          break;
        }
        case 'symbolic-link': {
          enum4 = 5;
          break;
        }
        case 'regular-file': {
          enum4 = 6;
          break;
        }
        case 'socket': {
          enum4 = 7;
          break;
        }
        default: {
          if ((v3_0) instanceof Error) {
            console.error(v3_0);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum4, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v3_2), true);
      var variant6 = v3_3;
      if (variant6 === null || variant6=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant6;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v5_0, nanoseconds: v5_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v5_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v5_1), true);
      }
      var variant8 = v3_4;
      if (variant8 === null || variant8=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant8;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v7_0, nanoseconds: v7_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v7_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v7_1), true);
      }
      var variant10 = v3_5;
      if (variant10 === null || variant10=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant10;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v9_0, nanoseconds: v9_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v9_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v9_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val11 = e;
      let enum11;
      switch (val11) {
        case 'access': {
          enum11 = 0;
          break;
        }
        case 'would-block': {
          enum11 = 1;
          break;
        }
        case 'already': {
          enum11 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum11 = 3;
          break;
        }
        case 'busy': {
          enum11 = 4;
          break;
        }
        case 'deadlock': {
          enum11 = 5;
          break;
        }
        case 'quota': {
          enum11 = 6;
          break;
        }
        case 'exist': {
          enum11 = 7;
          break;
        }
        case 'file-too-large': {
          enum11 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum11 = 9;
          break;
        }
        case 'in-progress': {
          enum11 = 10;
          break;
        }
        case 'interrupted': {
          enum11 = 11;
          break;
        }
        case 'invalid': {
          enum11 = 12;
          break;
        }
        case 'io': {
          enum11 = 13;
          break;
        }
        case 'is-directory': {
          enum11 = 14;
          break;
        }
        case 'loop': {
          enum11 = 15;
          break;
        }
        case 'too-many-links': {
          enum11 = 16;
          break;
        }
        case 'message-size': {
          enum11 = 17;
          break;
        }
        case 'name-too-long': {
          enum11 = 18;
          break;
        }
        case 'no-device': {
          enum11 = 19;
          break;
        }
        case 'no-entry': {
          enum11 = 20;
          break;
        }
        case 'no-lock': {
          enum11 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum11 = 22;
          break;
        }
        case 'insufficient-space': {
          enum11 = 23;
          break;
        }
        case 'not-directory': {
          enum11 = 24;
          break;
        }
        case 'not-empty': {
          enum11 = 25;
          break;
        }
        case 'not-recoverable': {
          enum11 = 26;
          break;
        }
        case 'unsupported': {
          enum11 = 27;
          break;
        }
        case 'no-tty': {
          enum11 = 28;
          break;
        }
        case 'no-such-device': {
          enum11 = 29;
          break;
        }
        case 'overflow': {
          enum11 = 30;
          break;
        }
        case 'not-permitted': {
          enum11 = 31;
          break;
        }
        case 'pipe': {
          enum11 = 32;
          break;
        }
        case 'read-only': {
          enum11 = 33;
          break;
        }
        case 'invalid-seek': {
          enum11 = 34;
          break;
        }
        case 'text-file-busy': {
          enum11 = 35;
          break;
        }
        case 'cross-device': {
          enum11 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val11}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum11, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline31(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.metadataHash()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {lower: v3_0, upper: v3_1 } = e;
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(v3_0), true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline32(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.metadataHashAt(flags3, result4)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      var {lower: v5_0, upper: v5_1 } = e;
      dataView(memory0).setBigInt64(arg4 + 8, toUint64(v5_0), true);
      dataView(memory0).setBigInt64(arg4 + 16, toUint64(v5_1), true);
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val6 = e;
      let enum6;
      switch (val6) {
        case 'access': {
          enum6 = 0;
          break;
        }
        case 'would-block': {
          enum6 = 1;
          break;
        }
        case 'already': {
          enum6 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum6 = 3;
          break;
        }
        case 'busy': {
          enum6 = 4;
          break;
        }
        case 'deadlock': {
          enum6 = 5;
          break;
        }
        case 'quota': {
          enum6 = 6;
          break;
        }
        case 'exist': {
          enum6 = 7;
          break;
        }
        case 'file-too-large': {
          enum6 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum6 = 9;
          break;
        }
        case 'in-progress': {
          enum6 = 10;
          break;
        }
        case 'interrupted': {
          enum6 = 11;
          break;
        }
        case 'invalid': {
          enum6 = 12;
          break;
        }
        case 'io': {
          enum6 = 13;
          break;
        }
        case 'is-directory': {
          enum6 = 14;
          break;
        }
        case 'loop': {
          enum6 = 15;
          break;
        }
        case 'too-many-links': {
          enum6 = 16;
          break;
        }
        case 'message-size': {
          enum6 = 17;
          break;
        }
        case 'name-too-long': {
          enum6 = 18;
          break;
        }
        case 'no-device': {
          enum6 = 19;
          break;
        }
        case 'no-entry': {
          enum6 = 20;
          break;
        }
        case 'no-lock': {
          enum6 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum6 = 22;
          break;
        }
        case 'insufficient-space': {
          enum6 = 23;
          break;
        }
        case 'not-directory': {
          enum6 = 24;
          break;
        }
        case 'not-empty': {
          enum6 = 25;
          break;
        }
        case 'not-recoverable': {
          enum6 = 26;
          break;
        }
        case 'unsupported': {
          enum6 = 27;
          break;
        }
        case 'no-tty': {
          enum6 = 28;
          break;
        }
        case 'no-such-device': {
          enum6 = 29;
          break;
        }
        case 'overflow': {
          enum6 = 30;
          break;
        }
        case 'not-permitted': {
          enum6 = 31;
          break;
        }
        case 'pipe': {
          enum6 = 32;
          break;
        }
        case 'read-only': {
          enum6 = 33;
          break;
        }
        case 'invalid-seek': {
          enum6 = 34;
          break;
        }
        case 'text-file-busy': {
          enum6 = 35;
          break;
        }
        case 'cross-device': {
          enum6 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val6}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum6, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline33(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.read(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc0(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(arg2 + 8, len3, true);
      dataView(memory0).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline34(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingRead(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc0(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(arg2 + 8, len3, true);
      dataView(memory0).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline35(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.checkWrite()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg1 + 12, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline36(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.write(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline37(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingFlush()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg1 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline38(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingWriteAndFlush(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline39(arg0, arg1, arg2) {
  var len3 = arg1;
  var base3 = arg0;
  var result3 = [];
  for (let i = 0; i < len3; i++) {
    const base = base3 + i * 4;
    var handle1 = dataView(memory0).getInt32(base + 0, true);
    var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
    var rsc0 = captureTable1.get(rep2);
    if (!rsc0) {
      rsc0 = Object.create(Pollable.prototype);
      Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
      Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
    }
    curResourceBorrows.push(rsc0);
    result3.push(rsc0);
  }
  const ret = poll(result3);
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var val4 = ret;
  var len4 = val4.length;
  var ptr4 = realloc0(0, 0, 4, len4 * 4);
  var src4 = new Uint8Array(val4.buffer, val4.byteOffset, len4 * 4);
  (new Uint8Array(memory0.buffer, ptr4, len4 * 4)).set(src4);
  dataView(memory0).setInt32(arg2 + 4, len4, true);
  dataView(memory0).setInt32(arg2 + 0, ptr4, true);
}

function trampoline40(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc0(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}

function trampoline41(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt6;
      captureTable6.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable6, rep);
    }
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
const handleTable4 = [T_FLAG, 0];
const captureTable4= new Map();
let captureCnt4 = 0;
handleTables[4] = handleTable4;

function trampoline42(arg0) {
  const ret = getTerminalStdin();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalInput)) {
      throw new TypeError('Resource error: Not a valid "TerminalInput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt4;
      captureTable4.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable4, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}
const handleTable5 = [T_FLAG, 0];
const captureTable5= new Map();
let captureCnt5 = 0;
handleTables[5] = handleTable5;

function trampoline43(arg0) {
  const ret = getTerminalStdout();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt5;
      captureTable5.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable5, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}

function trampoline44(arg0) {
  const ret = getTerminalStderr();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt5;
      captureTable5.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable5, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}
let exports3;
let realloc1;
let postReturn0;
let postReturn1;

function parseEntrypoint(arg0) {
  var {entrypoint: v0_0, projectDir: v0_1, runtime: v0_2 } = arg0;
  var ptr1 = utf8Encode(v0_0, realloc1, memory0);
  var len1 = utf8EncodedLen;
  var ptr2 = utf8Encode(v0_1, realloc1, memory0);
  var len2 = utf8EncodedLen;
  var val3 = v0_2;
  let enum3;
  switch (val3) {
    case 'node': {
      enum3 = 0;
      break;
    }
    case 'python': {
      enum3 = 1;
      break;
    }
    default: {
      if ((v0_2) instanceof Error) {
        console.error(v0_2);
      }
      
      throw new TypeError(`"${val3}" is not one of the cases of runtime`);
    }
  }
  const ret = exports1['parse-entrypoint'](ptr1, len1, ptr2, len2, enum3);
  let variant11;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var len8 = dataView(memory0).getInt32(ret + 8, true);
      var base8 = dataView(memory0).getInt32(ret + 4, true);
      var result8 = [];
      for (let i = 0; i < len8; i++) {
        const base = base8 + i * 24;
        var ptr4 = dataView(memory0).getInt32(base + 0, true);
        var len4 = dataView(memory0).getInt32(base + 4, true);
        var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
        let variant7;
        switch (dataView(memory0).getUint8(base + 8, true)) {
          case 0: {
            let enum5;
            switch (dataView(memory0).getUint8(base + 12, true)) {
              case 0: {
                enum5 = 'get';
                break;
              }
              case 1: {
                enum5 = 'delete';
                break;
              }
              case 2: {
                enum5 = 'patch';
                break;
              }
              case 3: {
                enum5 = 'post';
                break;
              }
              case 4: {
                enum5 = 'put';
                break;
              }
              default: {
                throw new TypeError('invalid discriminant specified for HttpMethod');
              }
            }
            var ptr6 = dataView(memory0).getInt32(base + 16, true);
            var len6 = dataView(memory0).getInt32(base + 20, true);
            var result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
            variant7= {
              tag: 'http-route',
              val: {
                method: enum5,
                path: result6,
              }
            };
            break;
          }
          case 1: {
            variant7= {
              tag: 'unsupported',
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for FnRouting');
          }
        }
        result8.push({
          fnName: result4,
          routing: variant7,
        });
      }
      var ptr9 = dataView(memory0).getInt32(ret + 12, true);
      var len9 = dataView(memory0).getInt32(ret + 16, true);
      var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
      variant11= {
        tag: 'ok',
        val: {
          handlers: result8,
          path: result9,
        }
      };
      break;
    }
    case 1: {
      var ptr10 = dataView(memory0).getInt32(ret + 4, true);
      var len10 = dataView(memory0).getInt32(ret + 8, true);
      var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
      variant11= {
        tag: 'err',
        val: result10
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant11;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
}

function parseFn(arg0) {
  var {entrypoint: v0_0, projectDir: v0_1, runtime: v0_2 } = arg0;
  var ptr1 = utf8Encode(v0_0, realloc1, memory0);
  var len1 = utf8EncodedLen;
  var ptr2 = utf8Encode(v0_1, realloc1, memory0);
  var len2 = utf8EncodedLen;
  var val3 = v0_2;
  let enum3;
  switch (val3) {
    case 'node': {
      enum3 = 0;
      break;
    }
    case 'python': {
      enum3 = 1;
      break;
    }
    default: {
      if ((v0_2) instanceof Error) {
        console.error(v0_2);
      }
      
      throw new TypeError(`"${val3}" is not one of the cases of runtime`);
    }
  }
  const ret = exports1['parse-fn'](ptr1, len1, ptr2, len2, enum3);
  let variant21;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      let enum4;
      switch (dataView(memory0).getUint8(ret + 4, true)) {
        case 0: {
          enum4 = 'required';
          break;
        }
        case 1: {
          enum4 = 'unused';
          break;
        }
        default: {
          throw new TypeError('invalid discriminant specified for FnDependencies');
        }
      }
      var len9 = dataView(memory0).getInt32(ret + 12, true);
      var base9 = dataView(memory0).getInt32(ret + 8, true);
      var result9 = [];
      for (let i = 0; i < len9; i++) {
        const base = base9 + i * 24;
        var ptr5 = dataView(memory0).getInt32(base + 0, true);
        var len5 = dataView(memory0).getInt32(base + 4, true);
        var result5 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr5, len5));
        let variant8;
        switch (dataView(memory0).getUint8(base + 8, true)) {
          case 0: {
            let enum6;
            switch (dataView(memory0).getUint8(base + 12, true)) {
              case 0: {
                enum6 = 'get';
                break;
              }
              case 1: {
                enum6 = 'delete';
                break;
              }
              case 2: {
                enum6 = 'patch';
                break;
              }
              case 3: {
                enum6 = 'post';
                break;
              }
              case 4: {
                enum6 = 'put';
                break;
              }
              default: {
                throw new TypeError('invalid discriminant specified for HttpMethod');
              }
            }
            var ptr7 = dataView(memory0).getInt32(base + 16, true);
            var len7 = dataView(memory0).getInt32(base + 20, true);
            var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
            variant8= {
              tag: 'http-route',
              val: {
                method: enum6,
                path: result7,
              }
            };
            break;
          }
          case 1: {
            variant8= {
              tag: 'unsupported',
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for FnRouting');
          }
        }
        result9.push({
          fnName: result5,
          routing: variant8,
        });
      }
      var ptr10 = dataView(memory0).getInt32(ret + 16, true);
      var len10 = dataView(memory0).getInt32(ret + 20, true);
      var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
      var len19 = dataView(memory0).getInt32(ret + 28, true);
      var base19 = dataView(memory0).getInt32(ret + 24, true);
      var result19 = [];
      for (let i = 0; i < len19; i++) {
        const base = base19 + i * 16;
        var len17 = dataView(memory0).getInt32(base + 4, true);
        var base17 = dataView(memory0).getInt32(base + 0, true);
        var result17 = [];
        for (let i = 0; i < len17; i++) {
          const base = base17 + i * 24;
          let variant16;
          switch (dataView(memory0).getUint8(base + 0, true)) {
            case 0: {
              var ptr11 = dataView(memory0).getInt32(base + 4, true);
              var len11 = dataView(memory0).getInt32(base + 8, true);
              var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
              let variant13;
              switch (dataView(memory0).getUint8(base + 12, true)) {
                case 0: {
                  variant13 = undefined;
                  break;
                }
                case 1: {
                  var ptr12 = dataView(memory0).getInt32(base + 16, true);
                  var len12 = dataView(memory0).getInt32(base + 20, true);
                  var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
                  variant13 = result12;
                  break;
                }
                default: {
                  throw new TypeError('invalid variant discriminant for option');
                }
              }
              variant16= {
                tag: 'package-dependency',
                val: {
                  package: result11,
                  subpath: variant13,
                }
              };
              break;
            }
            case 1: {
              var ptr14 = dataView(memory0).getInt32(base + 4, true);
              var len14 = dataView(memory0).getInt32(base + 8, true);
              var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
              variant16= {
                tag: 'relative-source',
                val: result14
              };
              break;
            }
            case 2: {
              var ptr15 = dataView(memory0).getInt32(base + 4, true);
              var len15 = dataView(memory0).getInt32(base + 8, true);
              var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
              variant16= {
                tag: 'unknown',
                val: result15
              };
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for ModuleImport');
            }
          }
          result17.push(variant16);
        }
        var ptr18 = dataView(memory0).getInt32(base + 8, true);
        var len18 = dataView(memory0).getInt32(base + 12, true);
        var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
        result19.push({
          imports: result17,
          path: result18,
        });
      }
      variant21= {
        tag: 'ok',
        val: {
          dependencies: enum4,
          entrypoint: {
            handlers: result9,
            path: result10,
          },
          sources: result19,
        }
      };
      break;
    }
    case 1: {
      var ptr20 = dataView(memory0).getInt32(ret + 4, true);
      var len20 = dataView(memory0).getInt32(ret + 8, true);
      var result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
      variant21= {
        tag: 'err',
        val: result20
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant21;
  postReturn1(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
}
function trampoline0(handle) {
  const handleEntry = rscTableRemove(handleTable1, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (Pollable[symbolCabiDispose]) {
      Pollable[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline1(handle) {
  const handleEntry = rscTableRemove(handleTable2, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable2.delete(handleEntry.rep);
    } else if (InputStream[symbolCabiDispose]) {
      InputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline2(handle) {
  const handleEntry = rscTableRemove(handleTable3, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable3.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable3.delete(handleEntry.rep);
    } else if (OutputStream[symbolCabiDispose]) {
      OutputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
const handleTable8 = [T_FLAG, 0];
const captureTable8= new Map();
let captureCnt8 = 0;
handleTables[8] = handleTable8;
function trampoline3(handle) {
  const handleEntry = rscTableRemove(handleTable8, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable9 = [T_FLAG, 0];
const captureTable9= new Map();
let captureCnt9 = 0;
handleTables[9] = handleTable9;
function trampoline4(handle) {
  const handleEntry = rscTableRemove(handleTable9, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable10 = [T_FLAG, 0];
const captureTable10= new Map();
let captureCnt10 = 0;
handleTables[10] = handleTable10;
function trampoline5(handle) {
  const handleEntry = rscTableRemove(handleTable10, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable11 = [T_FLAG, 0];
const captureTable11= new Map();
let captureCnt11 = 0;
handleTables[11] = handleTable11;
function trampoline6(handle) {
  const handleEntry = rscTableRemove(handleTable11, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable7 = [T_FLAG, 0];
const captureTable7= new Map();
let captureCnt7 = 0;
handleTables[7] = handleTable7;
function trampoline8(handle) {
  const handleEntry = rscTableRemove(handleTable7, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
function trampoline9(handle) {
  const handleEntry = rscTableRemove(handleTable6, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable6.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable6.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline10(handle) {
  const handleEntry = rscTableRemove(handleTable0, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline16(handle) {
  const handleEntry = rscTableRemove(handleTable4, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable4.delete(handleEntry.rep);
    } else if (TerminalInput[symbolCabiDispose]) {
      TerminalInput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline17(handle) {
  const handleEntry = rscTableRemove(handleTable5, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable5.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable5.delete(handleEntry.rep);
    } else if (TerminalOutput[symbolCabiDispose]) {
      TerminalOutput[symbolCabiDispose](handleEntry.rep);
    }
  }
}

const $init = (() => {
  let gen = (function* init () {
    const module0 = fetchCompile(new URL('./l3_fn_build.core.wasm', import.meta.url));
    const module1 = fetchCompile(new URL('./l3_fn_build.core2.wasm', import.meta.url));
    const module2 = base64Compile('AGFzbQEAAAABcxFgAn9/AX9gA39+fwF/YAR/f39/AX9gBX9/f39/AX9gCX9/f39/fn5/fwF/YAABf2ABfwF/YAN/f38Bf2ABfwBgAX8AYAJ/fwBgBX9/f39/AGAHf39/f39/fwBgA39+fwBgBH9/f38AYAN/f38AYAJ+fwADKSgAAQACAgMEAgUAAAYABwgGCQkKCwwNDQoKCgoLDQ0KDgoODxAJCQkJBAUBcAEoKAfKASkBMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoCMTEACwIxMgAMAjEzAA0CMTQADgIxNQAPAjE2ABACMTcAEQIxOAASAjE5ABMCMjAAFAIyMQAVAjIyABYCMjMAFwIyNAAYAjI1ABkCMjYAGgIyNwAbAjI4ABwCMjkAHQIzMAAeAjMxAB8CMzIAIAIzMwAhAjM0ACICMzUAIwIzNgAkAjM3ACUCMzgAJgIzOQAnCCRpbXBvcnRzAQAKlwQoCwAgACABQQARAAALDQAgACABIAJBAREBAAsLACAAIAFBAhEAAAsPACAAIAEgAiADQQMRAgALDwAgACABIAIgA0EEEQIACxEAIAAgASACIAMgBEEFEQMACxkAIAAgASACIAMgBCAFIAYgByAIQQYRBAALDwAgACABIAIgA0EHEQIACwcAQQgRBQALCwAgACABQQkRAAALCwAgACABQQoRAAALCQAgAEELEQYACwsAIAAgAUEMEQAACw0AIAAgASACQQ0RBwALCQAgAEEOEQgACwkAIABBDxEGAAsJACAAQRARCQALCQAgAEEREQkACwsAIAAgAUESEQoACxEAIAAgASACIAMgBEETEQsACxUAIAAgASACIAMgBCAFIAZBFBEMAAsNACAAIAEgAkEVEQ0ACw0AIAAgASACQRYRDQALCwAgACABQRcRCgALCwAgACABQRgRCgALCwAgACABQRkRCgALCwAgACABQRoRCgALEQAgACABIAIgAyAEQRsRCwALDQAgACABIAJBHBENAAsNACAAIAEgAkEdEQ0ACwsAIAAgAUEeEQoACw8AIAAgASACIANBHxEOAAsLACAAIAFBIBEKAAsPACAAIAEgAiADQSERDgALDQAgACABIAJBIhEPAAsLACAAIAFBIxEQAAsJACAAQSQRCQALCQAgAEElEQkACwkAIABBJhEJAAsJACAAQScRCQALAC8JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQHMC4yMTkuMQC1EQRuYW1lABMSd2l0LWNvbXBvbmVudDpzaGltAZgRKAAnYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1yYW5kb21fZ2V0ASthZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWNsb2NrX3RpbWVfZ2V0AixhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX2ZpbGVzdGF0X2dldAMkYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9yZWFkBCVhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3dyaXRlBS5hZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXBhdGhfZmlsZXN0YXRfZ2V0BiZhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXBhdGhfb3BlbgcoYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wb2xsX29uZW9mZggoYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1zY2hlZF95aWVsZAkoYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX2dldAouYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX3NpemVzX2dldAslYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9jbG9zZQwrYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9wcmVzdGF0X2dldA0wYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9wcmVzdGF0X2Rpcl9uYW1lDiZhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXByb2NfZXhpdA8wYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1hZGFwdGVyX2Nsb3NlX2JhZGZkEDNpbmRpcmVjdC13YXNpOmNsaS9lbnZpcm9ubWVudEAwLjIuMC1nZXQtZW52aXJvbm1lbnQRKWluZGlyZWN0LXdhc2k6Y2xvY2tzL3dhbGwtY2xvY2tAMC4yLjAtbm93EjppbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtZmlsZXN5c3RlbS1lcnJvci1jb2RlEz9pbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtW21ldGhvZF1kZXNjcmlwdG9yLnN0YXQtYXQUP2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3Iub3Blbi1hdBVHaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLVttZXRob2RdZGVzY3JpcHRvci5yZWFkLXZpYS1zdHJlYW0WSGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3Iud3JpdGUtdmlhLXN0cmVhbRdJaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLVttZXRob2RdZGVzY3JpcHRvci5hcHBlbmQtdmlhLXN0cmVhbRhAaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLVttZXRob2RdZGVzY3JpcHRvci5nZXQtdHlwZRk8aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLVttZXRob2RdZGVzY3JpcHRvci5zdGF0GkVpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtW21ldGhvZF1kZXNjcmlwdG9yLm1ldGFkYXRhLWhhc2gbSGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3IubWV0YWRhdGEtaGFzaC1hdBw4aW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2RdaW5wdXQtc3RyZWFtLnJlYWQdQWluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1bbWV0aG9kXWlucHV0LXN0cmVhbS5ibG9ja2luZy1yZWFkHkBpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjAtW21ldGhvZF1vdXRwdXQtc3RyZWFtLmNoZWNrLXdyaXRlHzppbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjAtW21ldGhvZF1vdXRwdXQtc3RyZWFtLndyaXRlIENpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjAtW21ldGhvZF1vdXRwdXQtc3RyZWFtLmJsb2NraW5nLWZsdXNoIU1pbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjAtW21ldGhvZF1vdXRwdXQtc3RyZWFtLmJsb2NraW5nLXdyaXRlLWFuZC1mbHVzaCIgaW5kaXJlY3Qtd2FzaTppby9wb2xsQDAuMi4wLXBvbGwjMmluZGlyZWN0LXdhc2k6cmFuZG9tL3JhbmRvbUAwLjIuMC1nZXQtcmFuZG9tLWJ5dGVzJDdpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vcHJlb3BlbnNAMC4yLjAtZ2V0LWRpcmVjdG9yaWVzJTlpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRpbkAwLjIuMC1nZXQtdGVybWluYWwtc3RkaW4mO2luZGlyZWN0LXdhc2k6Y2xpL3Rlcm1pbmFsLXN0ZG91dEAwLjIuMC1nZXQtdGVybWluYWwtc3Rkb3V0JztpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRlcnJAMC4yLjAtZ2V0LXRlcm1pbmFsLXN0ZGVycg');
    const module3 = base64Compile('AGFzbQEAAAABcxFgAn9/AX9gA39+fwF/YAR/f39/AX9gBX9/f39/AX9gCX9/f39/fn5/fwF/YAABf2ABfwF/YAN/f38Bf2ABfwBgAX8AYAJ/fwBgBX9/f39/AGAHf39/f39/fwBgA39+fwBgBH9/f38AYAN/f38AYAJ+fwAC9gEpAAEwAAAAATEAAQABMgAAAAEzAAIAATQAAgABNQADAAE2AAQAATcAAgABOAAFAAE5AAAAAjEwAAAAAjExAAYAAjEyAAAAAjEzAAcAAjE0AAgAAjE1AAYAAjE2AAkAAjE3AAkAAjE4AAoAAjE5AAsAAjIwAAwAAjIxAA0AAjIyAA0AAjIzAAoAAjI0AAoAAjI1AAoAAjI2AAoAAjI3AAsAAjI4AA0AAjI5AA0AAjMwAAoAAjMxAA4AAjMyAAoAAjMzAA4AAjM0AA8AAjM1ABAAAjM2AAkAAjM3AAkAAjM4AAkAAjM5AAkACCRpbXBvcnRzAXABKCgJLgEAQQALKAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIxOS4xABwEbmFtZQAVFHdpdC1jb21wb25lbnQ6Zml4dXBz');
    ({ exports: exports0 } = yield instantiateCore(yield module2));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      'wasi:io/poll@0.2.0': {
        '[resource-drop]pollable': trampoline0,
      },
      'wasi:io/streams@0.2.0': {
        '[resource-drop]input-stream': trampoline1,
        '[resource-drop]output-stream': trampoline2,
      },
      'wasi:sockets/tcp@0.2.0': {
        '[resource-drop]tcp-socket': trampoline6,
      },
      'wasi:sockets/udp@0.2.0': {
        '[resource-drop]incoming-datagram-stream': trampoline4,
        '[resource-drop]outgoing-datagram-stream': trampoline5,
        '[resource-drop]udp-socket': trampoline3,
      },
      wasi_snapshot_preview1: {
        adapter_close_badfd: exports0['15'],
        clock_time_get: exports0['1'],
        environ_get: exports0['9'],
        environ_sizes_get: exports0['10'],
        fd_close: exports0['11'],
        fd_filestat_get: exports0['2'],
        fd_prestat_dir_name: exports0['13'],
        fd_prestat_get: exports0['12'],
        fd_read: exports0['3'],
        fd_write: exports0['4'],
        path_filestat_get: exports0['5'],
        path_open: exports0['6'],
        poll_oneoff: exports0['7'],
        proc_exit: exports0['14'],
        random_get: exports0['0'],
        sched_yield: exports0['8'],
      },
    }));
    ({ exports: exports2 } = yield instantiateCore(yield module1, {
      __main_module__: {
        cabi_realloc: exports1.cabi_realloc,
      },
      env: {
        memory: exports1.memory,
      },
      'wasi:cli/environment@0.2.0': {
        'get-environment': exports0['16'],
      },
      'wasi:cli/exit@0.2.0': {
        exit: trampoline20,
      },
      'wasi:cli/stderr@0.2.0': {
        'get-stderr': trampoline15,
      },
      'wasi:cli/stdin@0.2.0': {
        'get-stdin': trampoline18,
      },
      'wasi:cli/stdout@0.2.0': {
        'get-stdout': trampoline19,
      },
      'wasi:cli/terminal-input@0.2.0': {
        '[resource-drop]terminal-input': trampoline16,
      },
      'wasi:cli/terminal-output@0.2.0': {
        '[resource-drop]terminal-output': trampoline17,
      },
      'wasi:cli/terminal-stderr@0.2.0': {
        'get-terminal-stderr': exports0['39'],
      },
      'wasi:cli/terminal-stdin@0.2.0': {
        'get-terminal-stdin': exports0['37'],
      },
      'wasi:cli/terminal-stdout@0.2.0': {
        'get-terminal-stdout': exports0['38'],
      },
      'wasi:clocks/monotonic-clock@0.2.0': {
        now: trampoline7,
        'subscribe-duration': trampoline13,
        'subscribe-instant': trampoline14,
      },
      'wasi:clocks/wall-clock@0.2.0': {
        now: exports0['17'],
      },
      'wasi:filesystem/preopens@0.2.0': {
        'get-directories': exports0['36'],
      },
      'wasi:filesystem/types@0.2.0': {
        '[method]descriptor.append-via-stream': exports0['23'],
        '[method]descriptor.get-type': exports0['24'],
        '[method]descriptor.metadata-hash': exports0['26'],
        '[method]descriptor.metadata-hash-at': exports0['27'],
        '[method]descriptor.open-at': exports0['20'],
        '[method]descriptor.read-via-stream': exports0['21'],
        '[method]descriptor.stat': exports0['25'],
        '[method]descriptor.stat-at': exports0['19'],
        '[method]descriptor.write-via-stream': exports0['22'],
        '[resource-drop]descriptor': trampoline9,
        '[resource-drop]directory-entry-stream': trampoline8,
        'filesystem-error-code': exports0['18'],
      },
      'wasi:io/error@0.2.0': {
        '[resource-drop]error': trampoline10,
      },
      'wasi:io/poll@0.2.0': {
        '[resource-drop]pollable': trampoline0,
        poll: exports0['34'],
      },
      'wasi:io/streams@0.2.0': {
        '[method]input-stream.blocking-read': exports0['29'],
        '[method]input-stream.read': exports0['28'],
        '[method]input-stream.subscribe': trampoline11,
        '[method]output-stream.blocking-flush': exports0['32'],
        '[method]output-stream.blocking-write-and-flush': exports0['33'],
        '[method]output-stream.check-write': exports0['30'],
        '[method]output-stream.subscribe': trampoline12,
        '[method]output-stream.write': exports0['31'],
        '[resource-drop]input-stream': trampoline1,
        '[resource-drop]output-stream': trampoline2,
      },
      'wasi:random/random@0.2.0': {
        'get-random-bytes': exports0['35'],
      },
    }));
    memory0 = exports1.memory;
    realloc0 = exports2.cabi_import_realloc;
    ({ exports: exports3 } = yield instantiateCore(yield module3, {
      '': {
        $imports: exports0.$imports,
        '0': exports2.random_get,
        '1': exports2.clock_time_get,
        '10': exports2.environ_sizes_get,
        '11': exports2.fd_close,
        '12': exports2.fd_prestat_get,
        '13': exports2.fd_prestat_dir_name,
        '14': exports2.proc_exit,
        '15': exports2.adapter_close_badfd,
        '16': trampoline21,
        '17': trampoline22,
        '18': trampoline23,
        '19': trampoline24,
        '2': exports2.fd_filestat_get,
        '20': trampoline25,
        '21': trampoline26,
        '22': trampoline27,
        '23': trampoline28,
        '24': trampoline29,
        '25': trampoline30,
        '26': trampoline31,
        '27': trampoline32,
        '28': trampoline33,
        '29': trampoline34,
        '3': exports2.fd_read,
        '30': trampoline35,
        '31': trampoline36,
        '32': trampoline37,
        '33': trampoline38,
        '34': trampoline39,
        '35': trampoline40,
        '36': trampoline41,
        '37': trampoline42,
        '38': trampoline43,
        '39': trampoline44,
        '4': exports2.fd_write,
        '5': exports2.path_filestat_get,
        '6': exports2.path_open,
        '7': exports2.poll_oneoff,
        '8': exports2.sched_yield,
        '9': exports2.environ_get,
      },
    }));
    realloc1 = exports1.cabi_realloc;
    postReturn0 = exports1['cabi_post_parse-entrypoint'];
    postReturn1 = exports1['cabi_post_parse-fn'];
  })();
  let promise, resolve, reject;
  function runNext (value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve) resolve(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
      value.then(runNext, reject);
    }
    catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();

await $init;

export { parseEntrypoint, parseFn,  }
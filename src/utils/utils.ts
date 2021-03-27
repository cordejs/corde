import {
  isPromise as _isPromise,
  buildReportMessage as _buildReportMessage,
  dateDiff as _dateDiff,
  deepEqual as _deepEqual,
  diff as _diff,
  executePromiseWithTimeout as _executePromiseWithTimeout,
  executeWithTimeout as _executeWithTimeout,
  formatObject as _formatObject,
  getStackTrace as _getStackTrace,
  isFunction as _isFunction,
  isNullOrUndefined as _isNullOrUndefined,
  isPrimitiveValue as _isPrimitiveValue,
  pick as _pick,
  resolveName as _resolveName,
  rgba as _rgba,
  stringIsNullOrEmpty as _stringIsNullOrEmpty,
  typeOf as _typeOf,
  wait as _wait,
  LogUpdate as _logUpdate,
  Guid as _Guid,
  calcPermissionsValue as _calcPermissionsValue,
} from "./";

export namespace utils {
  export const isPromise = _isPromise;
  export const buildReportMessage = _buildReportMessage;
  export const dateDiff = _dateDiff;
  export const deepEqual = _deepEqual;
  export const diff = _diff;
  export const executePromiseWithTimeout = _executePromiseWithTimeout;
  export const executeWithTimeout = _executeWithTimeout;
  export const formatObject = _formatObject;
  export const getStackTrace = _getStackTrace;
  export const isFunction = _isFunction;
  export const isNullOrUndefined = _isNullOrUndefined;
  export const isPrimitiveValue = _isPrimitiveValue;
  export const pick = _pick;
  export const resolveName = _resolveName;
  export const rgba = _rgba;
  export const stringIsNullOrEmpty = _stringIsNullOrEmpty;
  export const typeOf = _typeOf;
  export const wait = _wait;
  export const LogUpdate = _logUpdate;
  export const calcPermissionsValue = _calcPermissionsValue;
}

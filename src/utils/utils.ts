import { isPromise as _isPromise } from "./isPromise";
import { buildReportMessage as _buildReportMessage } from "./buildReportMessage";
import { dateDiff as _dateDiff } from "./dateDiff";
import { deepEqual as _deepEqual } from "./deepEqual";
import { diff as _diff } from "./diff";
import { executePromiseWithTimeout as _executePromiseWithTimeout } from "./executePromiseWithTimeout";
import { executeWithTimeout as _executeWithTimeout } from "./executeWithTimeout";
import { formatObject as _formatObject } from "./formatObject";
import { getStackTrace as _getStackTrace } from "./getStackTrace";
import { isFunction as _isFunction } from "./isFunction";
import { isNullOrUndefined as _isNullOrUndefined } from "./isNullOrUndefined";
import { isPrimitiveValue as _isPrimitiveValue } from "./isPrimitiveValue";
import { pick as _pick } from "./pick";
import { rgba as _rgba } from "./rgba";
import { stringIsNullOrEmpty as _stringIsNullOrEmpty } from "./stringIsNullOrEmpty";
import { typeOf as _typeOf } from "./typeOf";
import { wait as _wait } from "./wait";
import { LogUpdate as _logUpdate } from "./logUpdate";
import { calcPermissionsValue as _calcPermissionsValue } from "./permission";
import { resolveName as _resolveName } from "./resolveName";
import { isInDebugMode as _isInDebugMode } from "./isInDebugMode";
import { getFiles as _getFiles } from "./getFiles";

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
  export const isInDebugMode = _isInDebugMode;
  export const getFiles = _getFiles;
}
import { types as t } from '@babel/core';

/**
 * @param {any} rawValue - raw value to check
 */
export function astFromPrimitive(rawValue) {
  let value;
  if (typeof rawValue === 'string') value = t.stringLiteral(rawValue);
  else if (typeof rawValue === 'bigint') value = t.bigIntLiteral(rawValue.toString());
  else if (typeof rawValue === 'boolean') value = t.booleanLiteral(rawValue);
  else if (typeof rawValue === 'undefined') value = t.unaryExpression('void', t.numericLiteral(0), true);
  else if (rawValue === null) value = t.nullLiteral();
  else if (typeof rawValue === 'number') value = t.numericLiteral(rawValue);
  else if (rawValue instanceof RegExp) value = t.regExpLiteral(rawValue.toString());
  else throw new Error(`getAstFromPrimitive: unexpected rawValue: ${rawValue}`);
  return value;
}

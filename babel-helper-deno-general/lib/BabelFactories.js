import { types as t } from '@babel/core';
import { astFromPrimitive } from './helper';

/**
 * @param {string} methodChainWithDots - a
 * @param {array[string]} parameters - a
 * @param {object} methodOptions - a
 */
export function callExpressionFactory(methodChainWithDots, parameters, methodOptions) {
  const methodChainArray = methodChainWithDots.split('.');

  let nestedMemberExpression = t.identifier(methodChainArray.shift());
  for (const identifier of methodChainArray) {
    nestedMemberExpression = t.memberExpression(nestedMemberExpression, t.identifier(identifier));
  }

  const objectExpressionProperties = [];
  for (const key in methodOptions) {
    const rawValue = methodOptions[key];

    objectExpressionProperties.push(
      t.objectProperty(t.identifier(key), astFromPrimitive(rawValue)),
    );
  }

  const objectExpression = t.objectExpression(objectExpressionProperties);

  return t.callExpression(nestedMemberExpression, [...parameters, objectExpression]);
}

import {
  SpreadElement,
  ObjectExpression as OE,
  CallExpression as CE,
} from '../../node_modules/@babel/types/lib/index';

export * from '../../node_modules/@babel/types/lib/index';

declare global {
  interface ObjectExpression extends OE {}
  interface CallExpression extends CE {}
}

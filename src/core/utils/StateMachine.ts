import {callable} from "../constants.ts";
function keyToObject<T extends string, V>(fun:callable<V>,...keys:T[]): Record<T,V> {
  const x: Record<string, V> = {}
  for (const key of keys) {
    x[key] = fun()
  }
  return x
}

export class StateMachine<T extends string> {
  states: T[]
  handlers: Record<T, ((key?:T) => any)[]>
  current: T | undefined
  constructor(...states: T[]) {
    this.states = states
    this.handlers = keyToObject(function () {return []}, ...states)
  }

  addHandler(targetState:T, handler:(key?:T) => any) {
    this.handlers[targetState].push(handler)
  }

  changeState(targetState: T) {
    this.current = targetState
    this.handlers[targetState].forEach((handler) => handler())
  }
}
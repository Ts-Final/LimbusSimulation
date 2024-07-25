import {callable} from "../constants.ts";

export const Events = [
  "skill-count-changes",
] as const
type eventType = typeof Events[number]

export const EventHub = {
  handlers: {} as Record<eventType, callable[]>,
  on(event: eventType, handler: callable) {
    if (!this.handlers[event]) {
      this.handlers[event] = []
    }
    this.handlers[event].push(handler)
  },
  dispatch(event:eventType) {
    if (this.handlers[event]) {
      this.handlers[event].forEach(handler => handler())
    } else {
      console.warn(`Event *${event}* has no handlers`)
    }
  }
}
export const Events = [
  "IdentityCardMenu"
] as const

type event = typeof Events[number]

class eventHubClass {
  handlers: { [key in event]?: { cb: () => void, target: any }[] }

  constructor() {
    this.handlers = {}
  }

  on(event: event, handler: () => void, target: any) {
    if (!this.handlers[event]) {
      this.handlers[event] = []
    }
    this.handlers[event].push({ cb: handler, target })
  }

  dispatch(event: event) {
    if (this.handlers[event]) {
      this.handlers[event].forEach(x => x.cb())
    }
  }
}

export const EventHub = new eventHubClass()
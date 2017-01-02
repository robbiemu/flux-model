/* requires node-uuid */
const DispatcherSingletonKey = Symbol.for('App.Dispatcher')

class Dispatcher {
  constructor() {
    let globalSymbols = Object.getOwnPropertySymbols(window)
    let isInstantiated = (globalSymbols.indexOf(DispatcherSingletonKey) > -1)

    if (!isInstantiated) {
      window[DispatcherSingletonKey] = {
        stores: [],
        log: {},
        instance: this
      }
    }

    return window[DispatcherSingletonKey].instance;
  }

  enact(context, action) {
    let uuid = window.uuid.v4()
    let payload = {
      source: context.key,
      action: action,
      uuid: uuid
    }
    this.dispatch(payload)
    if (!(uuid in window[DispatcherSingletonKey].log))
      window[DispatcherSingletonKey].log[uuid] = []
    window[DispatcherSingletonKey].log[uuid].push(payload)
  }

  dispatch(payload) {
    window[DispatcherSingletonKey].stores.forEach(cb => cb(payload))
  }

  register(cb) {
    window[DispatcherSingletonKey].stores.push(cb)
  }
}
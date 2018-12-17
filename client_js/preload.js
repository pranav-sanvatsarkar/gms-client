// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
    alert('Process loaded')
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
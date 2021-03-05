const appendClassName = (baseClass, extendClass) => {
  if (!extendClass) {
    return baseClass
  }

  if (Array.isArray(extendClass)) {
    const classList = extendClass.filter(className => className && className !== undefined)
    return [baseClass, ...classList].join(' ').trim()
  }

  return [baseClass, extendClass].join(' ').trim()
}

export default appendClassName

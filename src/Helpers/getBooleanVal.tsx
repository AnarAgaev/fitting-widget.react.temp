const getBooleanVal = (el: object | boolean | [] | undefined): boolean => {
  let elType = true

  if (Array.isArray(el)) {
    elType = el.length > 0
  } else if (typeof el === 'object') {
    elType = Object.keys(el).length !== 0
  } else {
    elType = Boolean(el)
  }

  return elType
}

export default getBooleanVal
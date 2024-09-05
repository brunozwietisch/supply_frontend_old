/**
 * Verifica se o objeto possui algum parâmetro
 * @param {Object} obj
 *
 * @example isEmptyObj({})
 *
 * @returns {boolean} - true
 */
export const isEmptyObj = (object: Object): boolean => {
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      return false
    }
  }

  return JSON.stringify(object) === JSON.stringify({})
}

/**
 * Verifica se a string possui formato de JSON
 * @param {string} value
 *
 * @example isJsonString("test")
 *
 * @returns {boolean} - true
 */
export const isJsonString = (value: string): boolean => {
  try {
    JSON.parse(value)
  } catch (e) {
    return false
  }

  return true
}

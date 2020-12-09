export const store = (key, content) => {
  if (typeof localStorage !== 'undefined') {
    // We can use ls library to handle this as well
    localStorage.setItem(key, content)
  }
}

export const retrieve = (key) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key) || ''
  }
  return ''
}

// src/utils/auth.js

export const setUser = (email) => {
  localStorage.setItem("userEmail", email)
}

export const getUser = () => {
  return localStorage.getItem("userEmail")
}

export const logout = () => {
  localStorage.removeItem("userEmail")
}
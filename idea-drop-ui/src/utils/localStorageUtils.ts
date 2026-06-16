export type LSUser = {
  id: string
  name: string
  email: string
}

export const lsSetUser = (user: LSUser | null): void => {
  if (user) {
    localStorage.setItem("signedUser", JSON.stringify(user))
  } else {
    lsRemoveUser()
  }
}

export const lsGetUser = (): LSUser | null => {
  const lsUser = localStorage.getItem("signedUser")
  if (!lsUser) {
    return null
  }
  return JSON.parse(lsUser)
}

export const lsRemoveUser = (): void => {
  localStorage.removeItem("signedUser")
}

export const lsSetAccessToken = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken)
  } else {
    lsRemoveAccessToken()
  }
}

export const lsGetAccessToken = (): string | null => {
  const lsToken = localStorage.getItem("accessToken")
  if (!lsToken) {
    return null
  }
  return JSON.parse(lsToken)
}

export const lsRemoveAccessToken = (): void => {
  localStorage.removeItem("accessToken")
}

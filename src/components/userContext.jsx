import {
  createContext,
  useMemo,
  useContext,
  useState,
  useCallback,
} from "react"

const UserContext = createContext({
  email: "",
  setUser: () => {},
})

export const useUserContext = () => {
  return useContext(UserContext)
}

function UserContextProvider({ children }) {
  const [email, setEmail] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      return user.email
    } catch (e) {
      return email
    }
  })

  const handleSetUser = useCallback((user) => {
    const userString = JSON.stringify(user)
    localStorage.setItem("user", userString)
    setEmail(user.email)
  }, [])

  const value = useMemo(
    () => ({ email, setUser: handleSetUser }),
    [email, handleSetUser]
  )

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

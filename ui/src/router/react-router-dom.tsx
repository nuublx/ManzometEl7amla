import {
  Children,
  type PropsWithChildren,
  createContext,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type NavigateOptions = { replace?: boolean }

type RouterContextValue = {
  pathname: string
  navigate: (to: string, options?: NavigateOptions) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

type RouteProps = {
  path: string
  element: ReactElement
}

const normalizePath = (path: string) => {
  if (!path) {
    return '/'
  }

  return path.startsWith('/') ? path : `/${path}`
}

export const BrowserRouter = ({ children }: PropsWithChildren) => {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', syncPathname)

    return () => {
      window.removeEventListener('popstate', syncPathname)
    }
  }, [])

  const value = useMemo<RouterContextValue>(
    () => ({
      pathname,
      navigate: (to, options) => {
        const nextPath = normalizePath(to)

        if (options?.replace) {
          window.history.replaceState({}, '', nextPath)
        } else {
          window.history.pushState({}, '', nextPath)
        }

        setPathname(nextPath)
      },
    }),
    [pathname],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export const Route = (_props: RouteProps) => null

export const Routes = ({ children }: { children: ReactNode }) => {
  const router = useContext(RouterContext)
  if (!router) {
    throw new Error('Routes must be used inside BrowserRouter')
  }

  const routeElements = Children.toArray(children).filter(isValidElement<RouteProps>) as ReactElement<RouteProps>[]
  const activeRoute =
    routeElements.find((route) => route.props.path === router.pathname) ??
    routeElements.find((route) => route.props.path === '*')

  return activeRoute?.props.element ?? null
}

export const Navigate = ({ to, replace }: { to: string; replace?: boolean }) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to, { replace })
  }, [navigate, replace, to])

  return null
}

export const useNavigate = () => {
  const router = useContext(RouterContext)
  if (!router) {
    throw new Error('useNavigate must be used inside BrowserRouter')
  }

  return router.navigate
}

import type { LoaderFunctionArgs } from '@remix-run/node'

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'

import DefaultErrorBoundary from '~/components/DefaultErrorBoundary'

import './tailwind.css'
import { db } from './db/db.server'

export const loader = async ({}: LoaderFunctionArgs) => {
  const data = await db.query.users.findMany()
  console.log(data)
  return null
}

function Document({
  children,
  title,
}: {
  children?: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>{children}</Layout>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  )
}

function Layout({ children }: { children?: React.ReactNode }) {
  return <div className="min-h-screen max-w-full">{children}</div>
}

export default function App() {
  return (
    <Document title="Remix run project">
      <Outlet />
    </Document>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  let title: string
  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status} - ${error.statusText}`
  } else {
    const { message } = error as Error
    title = `Application Error - ${message}`
  }

  return (
    <Document title={title}>
      <DefaultErrorBoundary />
    </Document>
  )
}

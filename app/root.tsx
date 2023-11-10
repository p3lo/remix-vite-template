import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import DefaultErrorBoundary from "~/components/DefaultErrorBoundary";
import "./tailwind.css";

function Document({
  children,
  title,
}: {
  children?: React.ReactNode;
  title?: string;
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
  );
}

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen max-w-full">
      <div className="p-8">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let title: string;
  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status} - ${error.statusText}`;
  } else {
    const { message } = error as Error;
    title = `Application Error - ${message}`;
  }

  return (
    <Document title={title}>
      <DefaultErrorBoundary />
    </Document>
  );
}

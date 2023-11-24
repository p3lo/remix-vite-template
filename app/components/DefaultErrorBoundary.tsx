/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Link,
	isRouteErrorResponse,
	useRouteError,
	type ErrorResponse,
} from "@remix-run/react";
import {
	HiExclamationCircle,
	HiMinusCircle,
	HiExclamationTriangle,
	HiShieldExclamation,
	HiMagnifyingGlass,
} from "react-icons/hi2";

export default function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return <CatchBoundary caught={error} />;
	}

	const { message, stack } = error as Error;
	console.log(stack);

	return <AppError message={message} stack={stack} />;
}

function AppError({ message, stack }: { message?: string; stack?: string }) {
	return (
		<>
			<div className="m-2 rounded bg-red-100 p-4">
				<h1 className="font-bolder mb-1 inline-flex items-center gap-4 text-xl text-red-900">
					<HiExclamationCircle className="h-8 w-8" />
					{message || "App Error"}
				</h1>
				<p className="text-md mb-1">
					An error has occurred processing your request. You may try again or
					contact support if the problem persists.
				</p>
			</div>
			{stack && (
				<div className="my-4 w-[95%] bg-white p-4 text-black">
					<pre className="max-w-full overflow-auto text-sm">{stack}</pre>
				</div>
			)}
		</>
	);
}

function CatchBoundary({ caught }: { caught: ErrorResponse }) {
	let message = caught.data;
	let data: any = {};
	if (/^[[{]/.test(caught.data)) {
		try {
			data = JSON.parse(caught.data);
			message = data.message;
		} catch (error) {
			console.error(error);
		}
	}
	// } catch (error) {
	//   console.error(error);
	// }
	switch (caught.status) {
		case 400: {
			return <BadRequest message={message} data={data} />;
		}
		case 401: {
			return <Unauthorized message={message} data={data} />;
		}
		case 403: {
			return <Forbidden message={message} data={data} />;
		}
		case 404: {
			return <NotFound message={message} data={data} />;
		}
		case 405: {
			return <Invalid message={message} data={data} />;
		}
		default: {
			throw new Error(
				`Unexpected caught response with status: ${caught.status} ${caught.data}}`,
			);
		}
	}
}

function Unauthorized({ message, data }: { message?: string; data?: any }) {
	return (
		<div className="m-2 rounded bg-purple-100 p-4">
			<h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-xl text-purple-900">
				<HiMinusCircle className="h-8 w-8" />
				{message || "Unauthorized"}
			</h1>
			<p className="text-md mb-1">
				You must be logged into access this page. Click{" "}
				<Link to="/login">here</Link> to login.
			</p>
		</div>
	);
}

function BadRequest({ message, data }: { message?: string; data?: any }) {
	return (
		<div className="m-2 rounded bg-yellow-100 p-4">
			<h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-xl  text-red-900">
				<HiExclamationTriangle className="h-8 w-8" />
				{message || "Bad Request"}
			</h1>
			<p className="text-md mb-1">
				You made an invalid request. The following errors have occurred.
			</p>
			{data?.errors && (
				<ul>
					{Object.entries(data.errors).map(([key, value]) => (
						<li key={key}>
							<span className="font-mono font-bold">{key}:</span>{" "}
							{value as string}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function Invalid({ message, data }: { message?: string; data?: any }) {
	return (
		<div className="m-2 rounded bg-yellow-100 p-4">
			<h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-xl  text-red-900">
				<HiExclamationTriangle className="h-8 w-8" />
				{message || "Invalid"}
			</h1>
			<p className="text-md mb-1">You made an invalid request.</p>
		</div>
	);
}

function Forbidden({ message, data }: { message?: string; data?: any }) {
	return (
		<div className="m-2 rounded bg-orange-100 p-4">
			<h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-xl  text-orange-900">
				<HiShieldExclamation className="h-8 w-8" />
				{message || "Not Authorized"}
			</h1>
			<p className="text-md mb-1">
				You are not authorized to access this page.
			</p>
		</div>
	);
}

function NotFound({ message, data }: { message?: string; data?: any }) {
	return (
		<div className="m-2 rounded bg-blue-100 p-4">
			<h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-xl  text-blue-900">
				<HiMagnifyingGlass className="h-8 w-8" />
				{message || "Not Found"}
			</h1>
			<p className="text-md mb-1">
				The page you were looking for could not be found.
			</p>
		</div>
	);
}

export function ShowAllErrors() {
	return (
		<div className="flex flex-col gap-4">
			<AppError />
			<NotFound />
			<BadRequest />
			<Unauthorized />
			<Forbidden />
			<Invalid />
		</div>
	);
}

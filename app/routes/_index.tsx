import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader = async ({}: DataFunctionArgs) => {
	console.log("Hello from loader!");
	return { message: "Hello World!" };
};

export default function Index() {
	return (
		<div className="">
			<h1 className="text-4xl">Welcome to Remix</h1>
		</div>
	);
}

/* eslint-disable unicorn/prefer-module */
/** @type {import("prettier").Config} */
export default {
	plugins: ["prettier-plugin-tailwindcss"],
	trailingComma: "all",
	useTabs: true,
	tailwindConfig: "./tailwind.config.ts",
};

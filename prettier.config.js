/* eslint-disable unicorn/prefer-module */
/** @type {import("prettier").Config} */
export default {
	plugins: ["prettier-plugin-tailwindcss"],
	trailingComma: "all",
	useTabs: true,
	tabWidth: 2,
	tailwindConfig: "./tailwind.config.ts",
};

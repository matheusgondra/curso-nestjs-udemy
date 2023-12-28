export default {
	moduleFileExtensions: ["js", "json", "ts"],
	testRegex: ".*\\.e2e-spec\\.ts$",
	transforme: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	collectCoverageFrom: ["**/*.(t|j)s"],
	coverageDirectory: "./coverage",
	testEnvironment: "node"
}
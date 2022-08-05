import { loadEnvConfig } from "@next/env";
import matchers, {
  TestingLibraryMatchers,
} from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

declare global {
  namespace Vi {
    interface Assertion
      extends TestingLibraryMatchers<typeof expect.stringContaining, void> {}
  }
}

expect.extend(matchers);

loadEnvConfig(process.cwd());

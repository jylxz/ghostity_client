/* eslint-disable @typescript-eslint/no-namespace */
import { loadEnvConfig } from "@next/env";
import matchers, {
  TestingLibraryMatchers,
} from "@testing-library/jest-dom/matchers";
import { expect, vitest } from "vitest";

declare global {
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Assertion extends TestingLibraryMatchers<typeof expect.stringContaining, void> {}
  }
}

expect.extend(matchers);

loadEnvConfig(process.cwd());

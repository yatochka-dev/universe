import { createSafeActionClient } from "next-safe-action";

export interface ActionMetadata {
  actionName: string;
}

export const action = createSafeActionClient();

import type { AnyFieldApi } from "@tanstack/react-form";
import { cn } from "~/lib/utils";
import React from "react";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  const isError = field.state.meta.errors.length > 0;

  return (
    <span className={cn("opacity-0", isError && "text-red-500 opacity-100")}>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : (
        "uhm, hello, why are looking here???"
      )}
      {field.state.meta.isValidating ? "Validating..." : null}
    </span>
  );
}

"use client";

import React, { Suspense, lazy, useMemo, useState } from "react";
import type { TextFieldClientComponent } from "payload";
import { FieldLabel, useField } from "@payloadcms/ui";
import dynamicIconImports from "lucide-react/dynamicIconImports";

// Optional: let you pass a whitelist from config.admin.components.Field.clientProps
type Props = Parameters<TextFieldClientComponent>[0] & {
  allow?: Array<keyof typeof dynamicIconImports>;
};

const IconPreview = ({
  name,
  size = 20,
}: {
  name: keyof typeof dynamicIconImports;
  size?: number;
}) => {
  const LucideIcon = useMemo(() => lazy(dynamicIconImports[name]), [name]); // lazy-load specific icon
  return (
    <Suspense
      fallback={
        <span style={{ display: "inline-block", width: size, height: size }} />
      }
    >
      <LucideIcon size={size} />
    </Suspense>
  );
};

const IconPicker: TextFieldClientComponent = (props: Props) => {
  const { path, field, allow } = props;
  const { value, setValue } = useField<string>({ path });
  const [q, setQ] = useState("");

  const allNames = useMemo(
    () =>
      (
        Object.keys(dynamicIconImports) as Array<
          keyof typeof dynamicIconImports
        >
      ).sort(),
    [],
  );

  const names = useMemo(
    () =>
      (allow?.length ? allow : allNames).filter((n) =>
        n.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [q, allow, allNames],
  );

  return (
    <div className="payload-field">
      <FieldLabel
        label={field?.label ?? field?.name ?? "Icon"}
        path={path}
        required={field?.required}
      />

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <input
          type="text"
          placeholder="Search icons…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="field-type text"
          style={{ flex: 1, padding: 8 }}
        />
        {value ? (
          <button
            type="button"
            onClick={() => setValue("")}
            aria-label="Clear icon"
            className="btn"
          >
            Clear
          </button>
        ) : null}
      </div>

      {value ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <IconPreview
            name={value as keyof typeof dynamicIconImports}
            size={24}
          />
          <code>{value}</code>
        </div>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 8,
          maxHeight: 360,
          overflow: "auto",
          border: "1px solid var(--theme-elevation-150)",
          padding: 8,
          borderRadius: 6,
        }}
        role="listbox"
        aria-label="Lucide icons"
      >
        {names.map((name) => {
          const selected = value === name;
          return (
            <button
              key={name}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => setValue(name)}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: 8,
                borderRadius: 6,
                border: selected
                  ? "1px solid var(--theme-success-500)"
                  : "1px solid transparent",
                background: selected
                  ? "var(--theme-elevation-100)"
                  : "transparent",
                textAlign: "left",
              }}
            >
              <IconPreview name={name} />
              <span style={{ fontFamily: "monospace", fontSize: 12 }}>
                {name}
              </span>
            </button>
          );
        })}
      </div>
      <input type="hidden" name={path} value={value ?? ""} />
    </div>
  );
};

export default IconPicker;

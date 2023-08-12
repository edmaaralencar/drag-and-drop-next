"use client";

import Creatable from "react-select/creatable";

type SelectProps = {
  onChange: (values: any) => void;
  value: any;
  placeholder: string;
  multiple?: boolean;
  options: Array<{
    value: unknown;
    label: string;
  }>;
};

export function CreatableSelect({
  onChange,
  value,
  placeholder,
  multiple = false,
  options,
}: SelectProps) {
  return (
    <Creatable
      onChange={(value) => onChange(value)}
      isMulti={multiple}
      value={value}
      placeholder={placeholder}
      formatCreateLabel={(input) => `Criar ${input}`}
      classNames={{
        control: (props) =>
          props.isFocused
            ? "ring-offset-background ring-2 ring-ring ring-offset-2"
            : "",
        singleValue: (props) => "text-foreground text-sm",
        valueContainer: () => "px-3",
      }}
      styles={{
        container: (base) => ({
          ...base,
          border: "1px solid #1e293b",
          borderRadius: "6px",
        }),
        control: () => ({
          display: "flex",
          justifyContent: "space-between",
          background: "transparent",
          border: "transparent",
          outline: "none",
          minHeight: 38,
          borderRadius: 4,
        }),
        placeholder: (base, props) => ({
          ...base,
          fontSize: "14px",
          color: "#94a3b8",
        }),
        valueContainer: (base, props) => ({
          ...base,
          padding: "0 12px",
        }),
        menuList: (base, props) => ({
          background: "#020817",
          border: "1px solid #1e293b",
        }),
        option: (base, props) => ({
          color: "white",
          padding: "4px 8px",
          margin: 5,
          borderRadius: 4,
          fontSize: 14,
          ":hover": {
            background: "#1e293b",
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: "#F8FAFC",
        }),
        input: (base) => ({
          ...base,
          color: "#F8FAFC",
        }),
        multiValue: (base, props) => ({
          ...base,
          background: "#1e293b",
          gap: 2,
        }),
        multiValueLabel: (base, props) => ({
          ...base,
          fontSize: 12,
          color: "white",
        }),
        multiValueRemove: (base, props) => ({
          ...base,
          width: 24,
          height: 24,
          padding: 0,
          justifyContent: "center",
          ":hover": {
            background: "transparent",
          },
        }),
      }}
      options={options}
    />
  );
}

import React from "react";
import "./Filter.scss";

interface IFilterSelectItem extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  variant?: "sm";
  options: { name: string; value: any }[];
}

export const FilterSelectItem = React.forwardRef(
  (
    { label, options, variant, ...props }: IFilterSelectItem,
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <label
        className={`filter-item ${variant === "sm" ? "filter-item-sm" : ""}`}
        htmlFor={props.id}
        hidden={props.hidden}
      >
        <div className="filter-label">{label} :</div>

        <div className="filter-item-wrapper">
          <select className="filter-select" {...props} ref={ref}>
            {options.map((item) => (
              <option value={item.value} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  }
);

interface IFilterInputItem extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  variant?: "sm";
}

export const FilterInputItem = React.forwardRef(
  (
    { label, variant, ...props }: IFilterInputItem,
    ref?: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label
        className={`filter-item ${variant === "sm" ? "filter-item-sm" : ""}`}
        htmlFor={props.id}
        hidden={props.hidden}
      >
        <div className="filter-label">{label} :</div>

        <div className="filter-item-wrapper">
          <input className="filter-input" {...props} ref={ref} />
        </div>
      </label>
    );
  }
);

import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import "./Field.scss";

interface ISelectField extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { name: string; value: any }[];
}

export default forwardRef(({ label, id, options, ...props }: ISelectField, ref: ForwardedRef<HTMLSelectElement>) => {
  return (
    <label className="field" htmlFor={id} hidden={props.hidden}>
      <div className="field-label">{label}</div>

      <div className="field-wrapper">
        <select className="field-select" id={id} {...props} ref={ref}>
          {options.map((item) => (
            <option className="field-select-option" value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
});

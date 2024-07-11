import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import "./Field.scss";

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default forwardRef(({ label, id, ...props }: IInputField, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <label className="field" htmlFor={id} hidden={props.hidden}>
      <div className="field-label">{label}</div>
      <div className="field-wrapper">
        <input className="field-input" id={id} {...props} ref={ref} />
      </div>
    </label>
  );
});

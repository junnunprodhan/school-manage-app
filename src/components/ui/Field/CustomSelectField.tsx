import { ForwardedRef, forwardRef, useState } from "react";
import "./Field.scss";

interface ICustomSelectField {
  label: string;
  options: Record<string, any>;
  id?: any;
}

/**
 *
 *
 * value: ref.innerText
 */

export default forwardRef(({ label, id, options, ...props }: ICustomSelectField, ref: ForwardedRef<HTMLInputElement>) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<[string, string]>(Object.entries(options)[0]);

  return (
    <label className="field" htmlFor={id}>
      <div className="field-label">{label}</div>

      <div className="field-wrapper">
        <div className="field-custom-select" id={id} {...props}>
          <div className="field-custom-select-head" onClick={() => setOpen(true)}>
            {selectedOption[0]}
          </div>

          {/* value */}
          <input value={selectedOption[1]} hidden ref={ref} />

          {open && (
            <div className="field-custom-select-content scroll-y">
              {Object.entries(options).map(([key, value]) => (
                <div
                  className="field-custom-select-option"
                  key={key}
                  onClick={() => {
                    setSelectedOption([key, value]);
                    setOpen(false);
                  }}
                >
                  {key}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </label>
  );
});

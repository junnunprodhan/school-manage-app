interface IPresentInput extends React.InputHTMLAttributes<HTMLInputElement> {
  id: any;
}

export default function PresentInput({ id, ...props }: IPresentInput) {
  return (
    <div className="toggler grid place-items-center">
      <input className="toggler-input" type="checkbox" id={`present-${id}`} {...props} />
      <label className={"toggler-label"} htmlFor={`present-${id}`}></label>
    </div>
  );
}

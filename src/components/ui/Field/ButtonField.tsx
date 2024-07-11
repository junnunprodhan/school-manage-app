import "./Field.scss";

interface IInputField extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ButtonField({ children, ...props }: IInputField) {
  return (
    <button className="field-btn" {...props}>
      {children}
    </button>
  );
}

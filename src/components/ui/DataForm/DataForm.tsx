import { ButtonField } from "../Field";

interface IDataForm extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}


export function DataForm({ className, children, ...props }: IDataForm) {
  return (
    <form
    className={`max-w-md mx-auto w-full flex flex-col gap-16 ${className}`}
    {...props}
    >
      {children}
    </form>
  );
}

interface IDataFormSection extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  variant?: "flex" | "grid";
  children?: React.ReactNode;
}


export function Section({
  name,
  variant,
  className,
  children,
}: IDataFormSection) {
  return (
    <div className={`dataform-section ${className}`}>
      {name && (
        <h2 className="mb-8 text-center text-2xl font-semibold underline select-none">
          {name}
        </h2>
      )}

      <div className={variant === "grid" ? `` : `flex flex-col gap-16`}>
        {children}
      </div>
    </div>
  );
}

export function SubSection({
  name,
  variant,
  className,
  children,
}: IDataFormSection) {
  return (
    <div className={`dataform-subsection ${className}`}>
      {name && (
        <h2 className=" mb-6 text-xl font-semibold underline select-none">
          {name}
        </h2>
      )}

      <div
        className={
          variant === "grid"
          ? `grid grid-cols-1 sm:grid-cols-2 gap-8`
          : `flex flex-col gap-8`
        }
      >
        {children}
      </div>
    </div>
  );
}

interface IDataFormButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
export function Button({ className, children, ...props }: IDataFormButton) {
  return <ButtonField {...props}>{children}</ButtonField>;
}

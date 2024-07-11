interface IDetails extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  children?: React.ReactNode;
}
interface IDetailsSummary extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}
interface IDetailsContent extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}
interface IHeader extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function Details({ className, children, ...props }: IDetails) {
  return (
    <details className="" {...props}>
      {children}
    </details>
  );
}
export function Summary({ children, ...props }: IDetailsSummary) {
  return (
    <summary
      className="px-4 py-3 text-sm font-semibold backdrop-blur-xl bg-white/30 rounded-md transition-all cursor-pointer select-none hover:bg-white/50"
      {...props}
    >
      {children}
    </summary>
  );
}
export function Content({ children, ...props }: IDetailsContent) {
  return (
    <div className="px-4 pt-4 pb-8 flex flex-col gap-4" {...props}>
      {children}
    </div>
  );
}

export function Header({ children, ...props }: IHeader) {
  return (
    <div className="flex justify-end" {...props}>
      {children}
    </div>
  );
}

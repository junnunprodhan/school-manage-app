interface ILoading {
  name: string;
  describtion?: string;
  children?: React.ReactNode;
}

export default function Loading({ children, ...props }: ILoading) {
  return (
    <div className="h-72 flex flex-col items-center justify-center gap-6">
      <div className="w-36 h-36 grid place-items-center">
        <div className="absolute w-24 h-24 border-b-4 border-white/80 rounded-full animate-spin"></div>
        <div className="absolute w-20 h-20 border-b-4 border-white/60 rounded-full animate-spin"></div>
        <div className="absolute w-16 h-16 border-b-4 border-white/40 rounded-full animate-spin"></div>
        <div className="absolute w-12 h-12 border-b-4 border-white/20 rounded-full animate-spin"></div>
      </div>

      <div className="text-center">
        <h2 className="mb-1 text-2xl font-semibold text-white/50">{props.name}</h2>
        {props.describtion && (
          <span className="text-sm text-white/50">{props.describtion}</span>
        )}
      </div>

      {children && (
        <div className="flex items-center justify-center gap-4">{children}</div>
      )}
    </div>
  );
}

import React from "react";
import "./Filter.scss";

interface IFilter extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

interface IFilterSection extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface IFilterButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function Filter({ className, children, ...props }: IFilter) {
  return (
    <form className={`flex flex-col gap-6 ${className}`} {...props}>
      {children}
    </form>
  );
}

export function Section({ className, children }: IFilterSection) {
  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function SubSection({ className, children }: IFilterSection) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {children}
    </div>
  );
}

export function Button({ className, children, ...props }: IFilterButton) {
  return (
    <button
      className={`h-9 w-32 text-sm font-semibold border-2 border-gray-700 shadow-md rounded-md select-none hover:bg-white/60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

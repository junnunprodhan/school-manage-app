import { FormEvent } from "react";
import "./AuthForm.scss";
import { Link } from "react-router-dom";

interface IAuthForm {
  name: string;
  footer: {
    name: string;
    describtion: string;
    href: string;
  };
  children: React.ReactNode;
  onSubmit?: (e: FormEvent) => void;
}

export default function AuthForm({
  name,
  footer,
  children,
  onSubmit,
}: IAuthForm) {
  return (
    <div className="auth scroll-y">
      <div className="auth-container">
        <form className="auth-form" onSubmit={onSubmit}>
          <h2>{name}</h2>

          {children}

          <div className="auth-footer">
            <Link className="auth-footer-item" to={footer.href}>
              {footer.describtion}{" "}
              <span className="auth-footer-link">{footer.name}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
}

interface IButtonResponsive extends IButton {
  icon: IconType;
  text: string;
}

export function ButtonResponsive({ className = "", ...props }: IButtonResponsive) {
  const navigation = useNavigate();

  const onClick = (e: any) => {
    props.to && navigation(props.to);

    props.onClick && props.onClick(e);
  };

  return (
    <button className={`btn-responsive ${className}`} onClick={onClick}>
      <props.icon className="btn-responsive-icon" />
      <span className="btn-responsive-text">{props.text}</span>
    </button>
  );
}

interface IButtonIcon extends IButton {
  icon: IconType;
  variant?: "white";
}

export function ButtonIcon({ variant, className = "", ...props }: IButtonIcon) {
  const navigation = useNavigate();

  const onClick = (e: any) => {
    props.to && navigation(props.to);

    props.onClick && props.onClick(e);
  };

  return (
    <button className={`btn-icon ${variant === "white" ? "btn-icon-white" : ""} ${className}`} onClick={onClick}>
      <props.icon />
    </button>
  );
};
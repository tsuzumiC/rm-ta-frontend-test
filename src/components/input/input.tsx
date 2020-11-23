import React from "react";

interface IButton {
  type: "button" | "submit" | "reset";
  name?: string;
  id: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  displayName: string;
  disabled?: boolean;
}
export const Button = (props: IButton) => {
  return (
    <button
      type={props.type}
      name={props.name ? props.name : props.id}
      id={props.id}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.displayName}
    </button>
  );
};

interface IField {
  type: "text";
  name?: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  lable: string;
  value: string;
}

export const Field = (props: IField) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.lable}</label>
      <input
        id={props.id}
        name={props.name ? props.name : props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

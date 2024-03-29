import React from "react";
import "./InputField.scss";

interface InputFieldProps {
  id: string;
  type?: string;
  label: string;
  register: any;
  error: string | undefined;
}

export const InputField = ({
  id,
  type = "text",
  label,
  register,
  error,
}: InputFieldProps) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...register(id)} />
      {error && <p>{error}</p>}
    </div>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, FormikErrors, FormikTouched } from "formik";
import { HTMLInputTypeAttribute, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface IStyledTextInputProps<T> {
  label: string;
  name: keyof T;
  placeholder: string;
  textarea?: boolean;
  type?: HTMLInputTypeAttribute;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
}

function StyledTextInput<T>({
  label,
  name,
  placeholder,
  textarea = false,
  type = "text",
  errors,
  touched,
}: IStyledTextInputProps<T>) {
  const idRef = useRef(uuidv4());
  const id = idRef.current;

  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={id}>{label}</label>
      <Field
        id={id}
        name={name}
        placeholder={placeholder}
        as={textarea ? "textarea" : "input"}
        type={type}
        rows="3"
        className="rounded-md bg-userGray1 px-4 py-2 placeholder:text-sm placeholder:text-neutral-500"
      />
      {errors[name] && touched[name] && (
        <div className="pl-2 text-red-400">{errors[name]?.toString()}</div>
      )}
    </div>
  );
}

export default StyledTextInput;

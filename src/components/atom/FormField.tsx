import Input, { IFormAuth } from "./Input";

interface FormFieldProps extends IFormAuth {
    error?: string;
    touched?: boolean;
  }
  
  export const FormField = ({
    error,
    touched,
    ...inputProps
  }: FormFieldProps) => {
    return (
      <div className="w-full">
        <Input {...inputProps} />
        {error && touched && (
          <span className="text-red-500 text-xs mt-1 block">
            {error}
          </span>
        )}
      </div>
    );
  }
import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { ErrorOption } from "react-hook-form";
import { ElementWrapper, Label } from "@/components/Form/common";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errors?: ErrorOption;
  labelPosition?: 'horizontal' | 'vertical';
}

const Element = forwardRef<HTMLInputElement, IProps>(({
  label,
  labelPosition,
  value,
  name,
  type = 'text',
  errors,
  className,
  ...rest
}, ref) => {

  return (
    <ElementWrapper hasError={!!errors} className={clsx(className)}>
      <div className={clsx(labelPosition === 'horizontal' && 'horizontal-label')}>
        {label && (
          <Label name={name} hasError={!!errors}>
            {label}
          </Label>
        )}

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          ref={ref}
          className={clsx(
            'block w-full h-10 mt-1',
            'px-3 py-2',
            'border border-gray-100 rounded-md',
            'focus:ring-blue-600 focus:border-blue-600 focus:border-2 focus:outline-none',
            { 'border-red-50 border-2': errors }
          )}
          {...rest}
        />
      </div>
      {errors && <p className="text-sm pl-1 pr-1 text-red-50">{errors.message}</p>}
    </ElementWrapper>
  );
});

Element.displayName = 'Input';

export default Element;

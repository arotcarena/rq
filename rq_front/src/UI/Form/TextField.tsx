import React, { PropsWithChildren } from "react"


export type TextFieldProps = PropsWithChildren<{
    name: string,
    validation: any,
    value?: string|number,
    className?: string,
    [key: string]: any
}>

export const TextField = ({
    name,
    validation,
    value,
    children,
    className,
    ...props
}: TextFieldProps) => {

    const handleBlur = (e: any) => {
        validation.handleBlur(e);
    };

    const handleChange = (e: any) => {
        validation.handleChange(e);
    }

    return (
        <div style={{margin: '20px 0'}}>
            {
                children && (
                    <label htmlFor={name} className="form-label">{children}</label>
                )
            }
            <input
                id={name}
                name={name}
                className={'form-control' + (className ? ' ' + className: '') + (validation.touched[name] && validation.errors[name] ? ' is-invalid': '')}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={value || validation.values[name] || ""}
                placeholder={props.placeholder ?? ""}
                {...props}
            />
            {
                validation.touched[name] && validation.errors[name] ? (
                    <div className="form-error">{validation.errors[name]}</div>
                ) : null
            }
        </div>
    )
}
import React from 'react';

const Field = ({
    name,
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
    error = "",
    addedClass = '',
    checked
}) => {
    if (checked) {
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input
                    value={value}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder || label}
                    name={name}
                    id={name}
                    className={"form-control " + addedClass + (error && " is-invalid ")}
                    checked="checked"
                />
                {error && <span className="error text-danger">{error}</span>}
            </div>
        )
    }
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder || label}
                name={name}
                id={name}
                className={"form-control " + addedClass + (error && " is-invalid ")}
            />
            {error && <span className="error text-danger">{error}</span>}
        </div>
    )
}

export default Field;
import React from "react";
import { InputComponentProps } from "../types/field";

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type,
  value,
  options,
  placeholder,
  rows,
  hasError,
  info,
  datalist,
}) => {
  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <>
            <input
              type="text"
              className={`form-input ${hasError ? "error" : ""}`}
              value={(value as string) || ""}
            //   onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              list={datalist ? "datalist-options" : undefined}
            />
            {datalist && (
              <datalist id="datalist-options">
                {datalist.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
            )}
          </>
        );

      case "textarea":
        return (
          <textarea
            className={`form-textarea ${hasError ? "error" : ""}`}
            value={(value as string) || ""}
            // onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
          />
        );
      case "select":
        return (
          <select
            className="form-select"
            value={(value as string) || ""}
            // onChange={(e) => onChange(e.target.value)}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <div className="checkbox-container">
            <input
              type="checkbox"
              value={(value as string) || ""}
              //   onChange={(e) => onChange(e.target.checked)}
            />
            <span className="checkmark">{placeholder}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-row">
      <label className="form-label">{label}</label>
      <div className="form-input-container">
        {type === "checkbox" ? (
          <div className="type-controls">
            <span className="type-text">Multi-Select</span>
            {renderInput()}
          </div>
        ) : (
          renderInput()
        )}
        {info && <p className="form-info">{info}</p>}
      </div>
    </div>
  );
};

export default InputComponent;

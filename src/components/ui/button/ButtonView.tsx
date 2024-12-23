interface ButtonViewProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function ButtonView({
  children = "Quick View",
  onClick,
  isLoading = false,
  disabled = false,
  type = "button",
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonViewProps) {
  const baseStyles = "rounded-full font-medium transition-colors";

  const variants = {
    default: "bg-white text-gray-800 hover:bg-gray-100",
    outline: "border-2 border-gray-200 text-gray-800 hover:bg-gray-50",
    ghost: "text-gray-800 hover:bg-gray-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className || ""}
      `}
      {...props}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⚪</span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

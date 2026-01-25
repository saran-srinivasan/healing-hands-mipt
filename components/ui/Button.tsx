"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    default:
        "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus-visible:ring-[var(--color-primary-500)]",
    secondary:
        "bg-[var(--color-secondary-600)] text-white hover:bg-[var(--color-secondary-700)] focus-visible:ring-[var(--color-secondary-500)]",
    outline:
        "border-2 border-[var(--color-primary-600)] text-[var(--color-primary-600)] bg-transparent hover:bg-[var(--color-primary-50)] focus-visible:ring-[var(--color-primary-500)]",
    ghost:
        "text-[var(--color-primary-600)] bg-transparent hover:bg-[var(--color-primary-50)] focus-visible:ring-[var(--color-primary-500)]",
    accent:
        "bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-600)] focus-visible:ring-[var(--color-accent-400)]",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

export function Button({
    variant = "default",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "shadow-sm hover:shadow-md active:scale-[0.98]",
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
}

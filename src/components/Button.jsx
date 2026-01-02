import { forwardRef } from "react";

const buttonStyles = {
  // Base styles
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  
  // Variants
  variants: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 rounded-full",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
    outline: "border border-foreground/30 bg-transparent text-foreground hover:bg-foreground hover:text-background rounded-full",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
    ghost: "hover:bg-accent hover:text-accent-foreground rounded-full",
    link: "text-primary underline-offset-4 hover:underline",
    hero: "bg-primary text-primary-foreground font-display text-lg tracking-wider hover:bg-primary/90 hover:scale-105 uppercase rounded-full",
    heroDark: "bg-secondary text-secondary-foreground font-display text-lg tracking-wider hover:bg-secondary/90 uppercase rounded-full",
    tag: "bg-muted text-muted-foreground font-display text-xs tracking-wider uppercase rounded-full",
    tagGreen: "bg-success-light text-foreground font-display text-xs tracking-wider uppercase rounded-full border border-primary/30",
  },
  
  // Sizes
  sizes: {
    default: "h-10 px-6 py-2",
    sm: "h-9 px-4",
    lg: "h-12 px-8",
    xl: "h-14 px-10",
    icon: "h-10 w-10",
    tag: "h-8 px-4 py-1",
  },
};

const Button = forwardRef(({ 
  className = "", 
  variant = "default", 
  size = "default", 
  ...props 
}, ref) => {
  const variantClass = buttonStyles.variants[variant] || buttonStyles.variants.default;
  const sizeClass = buttonStyles.sizes[size] || buttonStyles.sizes.default;
  
  return (
    <button 
      className={`${buttonStyles.base} ${variantClass} ${sizeClass} ${className}`}
      ref={ref} 
      {...props} 
    />
  );
});

Button.displayName = "Button";

export { Button };

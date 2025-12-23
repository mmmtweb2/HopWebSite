const GlassButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-br from-primary to-emerald-600 text-white hover:shadow-glow-primary',
    secondary: 'bg-white/40 backdrop-blur-md text-slate-700 hover:bg-white/60 border border-white/60',
    blue: 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white hover:shadow-glow-blue',
    purple: 'bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:shadow-glow-purple',
    orange: 'bg-gradient-to-br from-orange-500 to-amber-600 text-white hover:shadow-glow-orange',
    pink: 'bg-gradient-to-br from-pink-500 to-rose-600 text-white hover:shadow-glow-pink',
    ghost: 'bg-transparent hover:bg-white/10 text-slate-600 hover:text-slate-800'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center gap-2
        rounded-xl font-medium
        transition-all duration-300
        hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      <span>{children}</span>
    </button>
  );
};

export default GlassButton;

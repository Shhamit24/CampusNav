import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon?: ReactNode;
  placeholder?: string;
  muted?: boolean;
  className?: string;
};

export function Dropdown({
  label,
  value,
  options,
  onChange,
  icon,
  placeholder,
  muted,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 text-left shadow-[var(--shadow-card)] transition-colors hover:border-foreground/15"
      >
        {icon ? <span className="shrink-0 text-muted-foreground">{icon}</span> : null}
        <span className="min-w-0 flex-1">
          {label ? (
            <span className="block text-[11.5px] leading-[1.3] font-normal tracking-wide text-muted-foreground">
              {label}
            </span>
          ) : null}
          <span
            className={cn(
              "block truncate text-[15px] leading-[1.25] font-medium",
              label && "mt-1",
              muted && !value ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {value || placeholder}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-border bg-popover p-1.5 shadow-[var(--shadow-card)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-secondary"
            >
              <span className="truncate">{option}</span>
              {option === value ? <Check className="size-4 text-nav" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
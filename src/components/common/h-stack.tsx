import { cn } from "@/lib/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
    className?: string
    reverse?: boolean
}

export function HStack({ children, className, reverse, ...rest }: Props) {
    return (
        <div
            className={cn(
                "flex flex-row items-center gap-2",
                className,
                reverse && "flex-row-reverse"
            )}
            {...rest}
        >
            {children}
        </div>
    )
}
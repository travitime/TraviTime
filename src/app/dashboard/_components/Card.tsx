
import { cn } from "@/lib/utils"
export default function Card({children,padding,bg,className}:{children:React.ReactNode,padding?:string,bg?:string,className?:string}) {
    return (
        <div className={cn(
            ` rounded-2xl w-full ${bg && bg} ${padding && padding}`,
            className
          )}>
{children}
            </div>
    );
    }

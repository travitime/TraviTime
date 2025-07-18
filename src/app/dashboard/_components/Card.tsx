
import { cn } from "@/lib/utils"
export default function Card({children,padding,bg,className, title}:{children:React.ReactNode,padding?:string,bg?:string,className?:string, title?:string}) {
    return (
        <div className={cn(
            ` rounded-2xl w-full ${bg && bg} ${padding && padding} shadow-sm`,
            className
          )}>
            {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
{children}
            </div>
        );
        }

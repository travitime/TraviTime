
import Card from '../Card'
export default function StatsItem({metric,value, description}:{metric:string,value:string, description:string}) {
    return (
        <Card bg="bg-white"  padding='p-4'>
            <h3 className="text-regular font-semibold m-0 text-gray-500">{metric}</h3>
            <h3 className="text-regular font-semibold m-0">{value}</h3>
                <p className="text-sm text-gray-400">{description}</p>
        </Card>
    )
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'
import { formatPercentage } from '@/lib/utils'

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    change?: number // percentage change
}

export function StatsCard({ title, value, icon: Icon, description, change }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(description || change !== undefined) && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {change !== undefined && (
                            <span className="flex items-center gap-1">
                                {change > 0 ? (
                                    <>
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                        <span className="text-green-500">{formatPercentage(change)}</span>
                                    </>
                                ) : change < 0 ? (
                                    <>
                                        <TrendingDown className="h-3 w-3 text-red-500" />
                                        <span className="text-red-500">{formatPercentage(change)}</span>
                                    </>
                                ) : (
                                    <span>—</span>
                                )}
                            </span>
                        )}
                        {description && <span>{description}</span>}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

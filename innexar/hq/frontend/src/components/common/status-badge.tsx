import { Badge } from '@/components/ui/badge'

interface StatusBadgeProps {
    status: string
    label?: string
    // Map specific status strings to badge variants.
    // Defaults: active -> success, blocked/inactive -> destructive, pending -> secondary
    variantMap?: Record<string, "default" | "secondary" | "destructive" | "outline" | "success">
}

export function StatusBadge({ status, label, variantMap }: StatusBadgeProps) {
    const defaultMap: Record<string, "default" | "secondary" | "destructive" | "outline" | "success"> = {
        active: 'success',
        paid: 'success',
        resolved: 'success',
        completed: 'success',

        inactive: 'secondary',
        pending: 'secondary',
        open: 'secondary',
        draft: 'secondary',
        trialing: 'secondary',
        development: 'secondary',

        blocked: 'destructive',
        canceled: 'destructive',
        failed: 'destructive',
        void: 'destructive',
        uncollectible: 'destructive',
        past_due: 'destructive',

        // Add more defaults as needed
        ...variantMap,
    }

    const variant = defaultMap[status] || 'secondary'

    // Default label capitalizes the status if no label provided
    const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1)

    return <Badge variant={variant}>{displayLabel}</Badge>
}

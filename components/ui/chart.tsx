"use client"

import { type ReactNode } from "react"
import { Tooltip, TooltipProps } from "recharts"

export type ChartConfig = Record<string, { label: string; color: string }>

interface ChartContainerProps {
  config: ChartConfig
  children: ReactNode
}

export function ChartContainer({ config, children }: ChartContainerProps) {
  return (
    <div
      className="h-[300px] w-full"
      style={
        {
          "--chart-1": "221.2 83.2% 53.3%",
          "--chart-2": "142.1 76.2% 36.3%",
          ...Object.entries(config).reduce(
            (vars, [key, value]) => ({
              ...vars,
              [`--color-${key}`]: value.color,
            }),
            {}
          ),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

interface ChartTooltipContentProps extends TooltipProps<any, any> {
  hideLabel?: boolean
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel,
}: ChartTooltipContentProps) {
  if (!active || !payload) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && <div className="text-xs text-muted-foreground">{label}</div>}
      <div className="flex flex-col gap-1">
        {payload.map(({ value, name }: any) => (
          <div key={name} className="flex items-center gap-2">
            <div className="text-sm font-medium">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const ChartTooltip = Tooltip
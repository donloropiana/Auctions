'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '@/components/providers/supabase-provider'
import { getDashboardTransactions } from '@/lib/api/listings'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils/price-format'

export default function DashboardPage() {
  const router = useRouter()
  const { user, profile, supabase } = useSupabase()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [user, router])

  const { data: transactions } = useQuery({
    queryKey: ['dashboard-transactions'],
    queryFn: () => getDashboardTransactions(supabase, user?.id as string),
    enabled: !!user?.id,
  })

  if (!user || !profile) return null

  return (
    <div className="container h-screen py-8 px-6">
      <Card className="h-[calc(100%-2rem)]">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)] p-0">
          <div className="relative h-full">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-[30%] pl-4">Item</TableHead>
                  <TableHead className="w-[20%]">Brand</TableHead>
                  <TableHead className="w-[20%] text-right">Final Price</TableHead>
                  <TableHead className="w-[20%] text-center">Date</TableHead>
                  <TableHead className="w-[10%] text-center pr-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-auto">
                {transactions?.map((transaction) => (
                  <TableRow 
                    key={`${transaction.id}-${transaction.type}`}
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => router.push(`/listings/${transaction.id}`)}
                  >
                    <TableCell className="w-[30%] pl-4">{transaction.name}</TableCell>
                    <TableCell className="w-[20%]">{transaction.brand}</TableCell>
                    <TableCell className="w-[20%] text-right">{formatPrice(transaction.current_price.amount)}</TableCell>
                    <TableCell className="w-[20%] text-center">
                      {new Date(transaction.end_date_time).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="w-[10%] text-center pr-4">
                      <Badge variant={transaction.type === 'won' ? 'default' : 'secondary'}>
                        {transaction.type === 'won' ? 'Won' : 'Sold'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
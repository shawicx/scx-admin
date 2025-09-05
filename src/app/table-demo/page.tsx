'use client'

import { TableExample } from '@/components/table/example'
import { AdvancedTableExample } from '@/components/table/advanced-example'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TableDemoPage() {
  return (
    <div className="mx-auto py-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">基础示例</TabsTrigger>
          <TabsTrigger value="advanced">高级示例</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <TableExample />
        </TabsContent>
        <TabsContent value="advanced">
          <AdvancedTableExample />
        </TabsContent>
      </Tabs>
    </div>
  )
}

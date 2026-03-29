'use client'

import { FileSpreadsheet, FileText, Database } from 'lucide-react'
import { externalLinks } from '@/lib/constants'
import { Button } from './Button'

export function DownloadsStrip() {
  const downloads = [
    { label: 'DUNE', icon: Database, href: externalLinks.duneSource },
    { label: 'EXCEL', icon: FileSpreadsheet, href: externalLinks.excelModel },
    { label: 'MEMO', icon: FileText, href: externalLinks.memoDoc },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {downloads.map((item) => (
        <Button key={item.label} variant="ghost" href={item.href} external>
          <item.icon size={16} />
          {item.label}
        </Button>
      ))}
    </div>
  )
}

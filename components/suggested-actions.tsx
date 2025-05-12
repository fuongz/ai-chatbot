'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { memo } from 'react'
import type { UseChatHelpers } from '@ai-sdk/react'
import type { VisibilityType } from './visibility-selector'

interface SuggestedActionsProps {
  chatId: string
  append: UseChatHelpers['append']
  selectedVisibilityType: VisibilityType
}

function PureSuggestedActions({ chatId, append, selectedVisibilityType }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Mèo mây',
      label: 'có biết đọc không?',
      action: 'Mèo mây có biết đọc không?',
    },
    {
      title: 'Viết một đoạn mô tả một con mèo trắng',
      label: `tên là mây, suốt ngày ngủ`,
      action: `Viết một đoạn mô tả một con mèo trắng tên là mây, suốt ngày ngủ`,
    },
    {
      title: 'Con người có hiểu được',
      label: `tiếng mèo kêu không?`,
      action: `Con người có hiểu được tiếng mèo kêu không?`,
    },
    {
      title: 'Cách dịch tiếng',
      label: 'mèo',
      action: 'Cách dịch tiếng mèo',
    },
  ]

  return (
    <div data-testid="suggested-actions" className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`)
              append({
                role: 'user',
                content: suggestedAction.action,
              })
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">{suggestedAction.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

export const SuggestedActions = memo(PureSuggestedActions, (prevProps, nextProps) => {
  if (prevProps.chatId !== nextProps.chatId) return false
  if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) return false

  return true
})

// #app/components/content/content-editor-module/content-edit-toolbar.tsx

import { floatingToolbarClassName } from '#app/components/core/floating-toolbar'
import { Button } from '#app/components/ui/button'
import { StatusButton } from '#app/components/ui/status-button'

interface ContentEditToolbarProps {
  formId: string
  isPending: boolean
  reset: { getButtonProps: () => Record<string, unknown> }
}

export function ContentEditToolbar({ formId, isPending, reset }: ContentEditToolbarProps) {
  return (
    <div className={floatingToolbarClassName}>
      <Button variant="destructive" {...reset.getButtonProps()}>
        Reset
      </Button>
      <StatusButton
        form={formId}
        type="submit"
        disabled={isPending}
        status={isPending ? 'pending' : 'idle'}
      >
        Submit
      </StatusButton>
    </div>
  )
}
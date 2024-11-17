

import { type FieldMetadata } from '@conform-to/react'
import { Textarea } from '#app/ellemment-ui/shadcn/textarea'
import { ErrorList } from '#app/ellemment-ui/shared/forms'
import { type ImageFieldset } from '#app/utils/content/schemas-module/schemas'

export interface AltTextInputProps {
    fields: ReturnType<FieldMetadata<ImageFieldset>['getFieldset']>
    textareaKey: string
    textareaRestProps: Record<string, unknown>
    setAltText: (value: string) => void
}

export function ContentImageAltText({
    fields,
    textareaKey,
    textareaRestProps,
    setAltText,
}: AltTextInputProps) {
    return (
        <div className="w-32">
            <Textarea
                key={textareaKey}
                onChange={(e) => setAltText(e.currentTarget.value)}
                className="h-12 w-full resize-none border-0 bg-background px-3 py-2 text-xs placeholder:text-xs focus:outline-none focus:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Alt text"
                {...textareaRestProps}
            />
            {fields.altText.errors && fields.altText.errors.length > 0 ? (
                <div className="min-h-[20px] px-2 pb-1 pt-0.5">
                    <ErrorList
                        id={fields.altText.errorId}
                        errors={fields.altText.errors}
                    />
                </div>
            ) : null}
        </div>
    )
}
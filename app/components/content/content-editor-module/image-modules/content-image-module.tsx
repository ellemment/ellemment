// #app/components/content/content-editor-module/image-modules/content-image-module.tsx

import { type FieldMetadata, getFieldsetProps, getInputProps, getTextareaProps } from '@conform-to/react'
import { useState } from 'react'
import { ErrorList } from '#app/components/core/forms'
import { Button } from '#app/components/ui/button'
import { Icon } from '#app/components/ui/icon'
import { Label } from '#app/components/ui/label'
import { Textarea } from '#app/components/ui/textarea'
import { type ContentEditorData, type ImageFieldset } from '#app/utils/content/content-schemas/schemas.js'
import { type AltTextInputProps } from '#app/utils/content/content-types/types.js'
import { cn, getContentImgSrc } from '#app/utils/misc'

// AltTextInput Component
export function AltTextInput({
    fields,
    textareaKey,
    textareaRestProps,
    setAltText,
}: AltTextInputProps) {
    return (
        <div className="flex-1">
            <Label htmlFor={fields.altText.id}>Alt Text</Label>
            <Textarea
                key={textareaKey}
                onChange={(e) => setAltText(e.currentTarget.value)}
                {...textareaRestProps}
            />
            <div className="min-h-[32px] px-4 pb-3 pt-1">
                <ErrorList
                    id={fields.altText.errorId}
                    errors={fields.altText.errors}
                />
            </div>
        </div>
    )
}

// ImageChooser Component
export function ImageChooser({ meta }: { meta: FieldMetadata<ImageFieldset> }) {
    const fields = meta.getFieldset()
    const existingImage = Boolean(fields.id.initialValue)
    const [previewImage, setPreviewImage] = useState<string | null>(
        fields.id.initialValue ? getContentImgSrc(fields.id.initialValue) : null,
    )
    const [altText, setAltText] = useState(fields.altText.initialValue ?? '')

    const textareaProps = getTextareaProps(fields.altText)
    const { key: textareaKey = '', ...textareaRestProps } = textareaProps  // Provide default empty string

    const fileInputProps = getInputProps(fields.file, { type: 'file' })
    const { key: fileKey, ...fileRestProps } = fileInputProps

    const hiddenInputProps = existingImage ? getInputProps(fields.id, { type: 'hidden' }) : null
    const { key: hiddenKey, ...hiddenRestProps } = hiddenInputProps || {}

    return (
        <fieldset {...getFieldsetProps(meta)}>
            <div className="flex gap-3">
                <div className="w-32">
                    <div className="relative h-32 w-32">
                        <label
                            htmlFor={fields.file.id}
                            className={cn('group absolute h-32 w-32 rounded-lg', {
                                'bg-accent opacity-40 focus-within:opacity-100 hover:opacity-100':
                                    !previewImage,
                                'cursor-pointer focus-within:ring-2': !existingImage,
                            })}
                        >
                            {previewImage ? (
                                <div className="relative">
                                    <img
                                        src={previewImage}
                                        alt={altText ?? ''}
                                        className="h-32 w-32 rounded-lg object-cover"
                                    />
                                    {existingImage ? null : (
                                        <div className="pointer-events-none absolute -right-0.5 -top-0.5 rotate-12 rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground shadow-md">
                                            new
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex h-32 w-32 items-center justify-center rounded-lg border border-muted-foreground text-4xl text-muted-foreground">
                                    <Icon name="plus" />
                                </div>
                            )}
                            {existingImage ? (
                                <input key={hiddenKey} {...hiddenRestProps} />
                            ) : null}
                            <input
                                key={fileKey}
                                aria-label="Image"
                                className="absolute left-0 top-0 z-0 h-32 w-32 cursor-pointer opacity-0"
                                onChange={(event) => {
                                    const file = event.target.files?.[0]
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            setPreviewImage(reader.result as string)
                                        }
                                        reader.readAsDataURL(file)
                                    } else {
                                        setPreviewImage(null)
                                    }
                                }}
                                accept="image/*"
                                {...fileRestProps}
                            />
                        </label>
                    </div>
                    <div className="min-h-[32px] px-4 pb-3 pt-1">
                        <ErrorList id={fields.file.errorId} errors={fields.file.errors} />
                    </div>
                </div>
                <AltTextInput
                    fields={fields}
                    textareaKey={textareaKey}  // Now textareaKey will always have a value
                    textareaRestProps={textareaRestProps}
                    setAltText={setAltText}
                />
            </div>
            <div className="min-h-[32px] px-4 pb-3 pt-1">
                <ErrorList id={meta.errorId} errors={meta.errors} />
            </div>
        </fieldset>
    )
}

// ContentEditImages Component remains the same...
interface ContentEditImagesProps {
    field: FieldMetadata<ImageFieldset[], ContentEditorData, string[]> & {
        getFieldList: () => Array<FieldMetadata<ImageFieldset, ContentEditorData, string[]>>
    }
    form: {
        remove: {
            getButtonProps: (props: {
                name: string
                index: number
            }) => Record<string, unknown>
        }
        insert: { getButtonProps: (props: { name: string }) => Record<string, unknown> }
    }
}

export function ContentEditImages({ field, form }: ContentEditImagesProps) {
    const imageList = field.getFieldList()
    return (
        <div>
            <Label>Images</Label>
            <ul className="flex flex-col gap-4">
                {imageList.map((image, index: number) => {
                    const uniqueKey = `${image.key}-${index}-${image.id || 'new'}`
                    return (
                        <li
                            key={uniqueKey}
                            className="relative border-b-2 border-muted-foreground"
                        >
                            <button
                                className="absolute right-0 top-0 text-foreground-destructive"
                                {...form.remove.getButtonProps({
                                    name: field.name,
                                    index,
                                })}
                            >
                                <span aria-hidden>
                                    <Icon name="cross-1" />
                                </span>{' '}
                                <span className="sr-only">
                                    Remove image {index + 1}
                                </span>
                            </button>
                            <ImageChooser meta={image} />
                        </li>
                    )
                })}
            </ul>
            <Button
                className="mt-3"
                {...form.insert.getButtonProps({ name: field.name })}
            >
                <span aria-hidden>
                    <Icon name="plus">Image</Icon>
                </span>{' '}
                <span className="sr-only">Add image</span>
            </Button>
        </div>
    )
}
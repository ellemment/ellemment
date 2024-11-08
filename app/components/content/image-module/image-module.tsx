// #app/components/content/content-editor-module/image-modules/content-image-module.tsx

import { type FieldMetadata, getFieldsetProps, getInputProps } from '@conform-to/react'
import { useState, useEffect } from 'react'
import { ErrorList } from '#app/components/core/forms'
import { Icon } from '#app/components/ui/icon'
import { type ContentEditorData, type ImageFieldset } from '#app/utils/content/schemas-module/schemas'
import { cn, getContentImgSrc } from '#app/utils/misc'

// ImageChooser Component
interface ImageChooserProps {
    meta: FieldMetadata<ImageFieldset>
    index: number
}

export function ImageChooser({ meta, index }: ImageChooserProps) {
    const fields = meta.getFieldset()
    const existingImage = Boolean(fields.id.initialValue)
    const [previewImage, setPreviewImage] = useState<string | null>(
        fields.id.initialValue ? getContentImgSrc(fields.id.initialValue) : null,
    )

    // Get the form element to access the title input
    useEffect(() => {
        if (!previewImage) return

        // Find the title input in the form
        const form = document.getElementById('content-editor') as HTMLFormElement
        if (!form) return

        const titleInput = form.querySelector('input[type="text"]') as HTMLInputElement
        if (!titleInput) return

        // Generate alt text based on title and index
        const title = titleInput.value.trim()
        const altText = index === 0 ? title : `${title}_${index + 1}`

        // Set the alt text in the hidden input
        const altTextInput = document.createElement('input')
        altTextInput.type = 'hidden'
        altTextInput.name = fields.altText.name
        altTextInput.value = altText

        // Replace existing alt text input or append new one
        const existingAltTextInput = form.querySelector(`input[name="${fields.altText.name}"]`) as HTMLInputElement
        if (existingAltTextInput) {
            existingAltTextInput.value = altText
        } else {
            form.appendChild(altTextInput)
        }
    }, [previewImage, index, fields.altText.name])

    const fileInputProps = getInputProps(fields.file, { type: 'file' })
    const { key: fileKey, ...fileRestProps } = fileInputProps

    const hiddenInputProps = existingImage ? getInputProps(fields.id, { type: 'hidden' }) : null
    const { key: hiddenKey, ...hiddenRestProps } = hiddenInputProps || {}

    return (
        <fieldset {...getFieldsetProps(meta)}>
            <div className="flex flex-col gap-2">
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
                                        alt=""
                                        className="h-32 w-32 rounded-lg object-cover"
                                    />
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
                    {fields.file.errors && fields.file.errors.length > 0 ? (
                        <div className="min-h-[32px] px-4 pb-3 pt-1">
                            <ErrorList id={fields.file.errorId} errors={fields.file.errors} />
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="min-h-[32px] px-4 pb-3 pt-1">
                <ErrorList id={meta.errorId} errors={meta.errors} />
            </div>
        </fieldset>
    )
}

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
            <ul className="flex flex-wrap gap-5">
                {imageList.map((image, index: number) => {
                    const uniqueKey = `${image.key}-${index}-${image.id || 'new'}`
                    return (
                        <li
                            key={uniqueKey}
                            className="relative"
                        >
                            <div className="relative">
                                <ImageChooser
                                    meta={image}
                                    index={index}
                                />
                                <button
                                    className="absolute -right-2 -top-2 rounded-full bg-background/80 p-1.5 text-white hover:text-destructive aspect-square h-6 w-6 inline-flex items-center justify-center drop-shadow-md transition-colors"
                                    {...form.remove.getButtonProps({
                                        name: field.name,
                                        index,
                                    })}
                                >
                                    <span aria-hidden className="h-3.5 w-3.5 inline-flex items-center justify-center">
                                        <Icon name="cross-1" />
                                    </span>
                                    <span className="sr-only">
                                        Remove image {index + 1}
                                    </span>
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
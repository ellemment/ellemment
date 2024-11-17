

import { getFieldsetProps, getInputProps } from '@conform-to/react'
import { Icon } from '#app/ellemment-ui/foundations/icons/icon'
import { ErrorList } from '#app/ellemment-ui/shared/forms'
import { useImageAltText, useImagePreview } from '#app/utils/content/image-module/hooks'
import { type ImageChooserProps, type ContentEditImagesProps } from '#app/utils/content/image-module/types'
import { cn } from '#app/utils/misc'

function ImagePreview({ url }: { url: string | null }) {
    if (!url) {
        return (
            <div className="flex h-32 w-32 items-center justify-center rounded-lg border border-muted-foreground text-4xl text-muted-foreground">
                <Icon name="plus" />
            </div>
        )
    }

    return (
        <div className="relative">
            <img
                src={url}
                alt=""
                className="h-32 w-32 rounded-lg object-cover"
            />
        </div>
    )
}

export function ImageChooser({ meta, index }: ImageChooserProps) {
    const fields = meta.getFieldset()
    const existingImage = Boolean(fields.id.initialValue)
    const { previewImage, handleFileChange } = useImagePreview(fields.id.initialValue)
    
    useImageAltText(fields, index, previewImage)

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
                            <ImagePreview url={previewImage} />
                            
                            {existingImage ? (
                                <input key={hiddenKey} {...hiddenRestProps} />
                            ) : null}
                            
                            <input
                                key={fileKey}
                                aria-label="Image"
                                className="absolute left-0 top-0 z-0 h-32 w-32 cursor-pointer opacity-0"
                                onChange={(event) => {
                                    handleFileChange(event.target.files?.[0] ?? null)
                                }}
                                accept="image/*"
                                {...fileRestProps}
                            />
                        </label>
                    </div>
                    <ErrorContainer
                        errorId={fields.file.errorId}
                        errors={fields.file.errors}
                    />
                </div>
            </div>
            <ErrorContainer
                errorId={meta.errorId}
                errors={meta.errors}
            />
        </fieldset>
    )
}

function ErrorContainer({ errorId, errors }: { errorId: string; errors: string[] | null | undefined }) {
    if (!errors?.length) return null
    
    return (
        <div className="min-h-[32px] px-4 pb-3 pt-1">
            <ErrorList id={errorId} errors={errors} />
        </div>
    )
}

function RemoveImageButton({ 
    form, 
    fieldName, 
    index 
}: { 
    form: ContentEditImagesProps['form']
    fieldName: string
    index: number 
}) {
    return (
        <button
            className="absolute -right-2 -top-2 rounded-full bg-background/80 p-1.5 text-white hover:text-destructive aspect-square h-6 w-6 inline-flex items-center justify-center drop-shadow-md transition-colors"
            {...form.remove.getButtonProps({
                name: fieldName,
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
    )
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
                                <RemoveImageButton
                                    form={form}
                                    fieldName={field.name}
                                    index={index}
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
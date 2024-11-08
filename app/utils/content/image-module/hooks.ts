// app/utils/content/image-module/hooks.ts

import { type FieldMetadata } from '@conform-to/react'
import { useState, useEffect } from 'react'
import { type ImageFieldset , getContentImgSrc } from '#app/utils/content/image-module'

export function useImageAltText(
    fields: ReturnType<FieldMetadata<ImageFieldset>['getFieldset']>,
    index: number,
    previewImage: string | null
) {
    useEffect(() => {
        if (!previewImage) return

        const form = document.getElementById('content-editor') as HTMLFormElement
        if (!form) return

        const titleInput = form.querySelector('input[type="text"]') as HTMLInputElement
        if (!titleInput) return

        const title = titleInput.value.trim()
        const altText = index === 0 ? title : `${title}_${index + 1}`

        const altTextInput = document.createElement('input')
        altTextInput.type = 'hidden'
        altTextInput.name = fields.altText.name
        altTextInput.value = altText

        const existingAltTextInput = form.querySelector(
            `input[name="${fields.altText.name}"]`
        ) as HTMLInputElement
        
        if (existingAltTextInput) {
            existingAltTextInput.value = altText
        } else {
            form.appendChild(altTextInput)
        }
    }, [previewImage, index, fields.altText.name])
}

export function useImagePreview(initialImageId: string | undefined | null) {
    const [previewImage, setPreviewImage] = useState<string | null>(() => {
        if (!initialImageId) return null
        return getContentImgSrc(initialImageId)
    })

    const handleFileChange = (file: File | null) => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setPreviewImage(null)
        }
    }

    return { previewImage, handleFileChange }
}
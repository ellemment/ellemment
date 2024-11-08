// #app/components/content/content-editor-module/content-edit.tsx

import { useForm, type FieldMetadata } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { type Content, type ContentImage } from '@prisma/client'
import { type SerializeFrom } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { useRef } from 'react'
import { ErrorList, Field } from '#app/components/core/forms'
import { Button } from '#app/components/ui/button'
import { Icon } from '#app/components/ui/icon'
import { StatusButton } from '#app/components/ui/status-button'
import { ContentEditorSchema } from '#app/utils/content/schemas-module/schemas'
import { type ActionData } from '#app/utils/content/types-module/types'
import { useIsPending } from '#app/utils/misc'
import { ContentEditImages } from '../image-module/image-module'
import { Editor } from '../tiptap-modules/editor'

type ContentEditorFormData = {
    id?: string
    title: string
    content: string
    images?: Array<{
        id?: string
        altText?: string
        file?: File
    }>
}

interface ContentEditorProps {
    content?: SerializeFrom<
        Pick<Content, 'id' | 'title' | 'content'> & {
            images: Array<Pick<ContentImage, 'id' | 'altText'>>
        }
    >
}

function ContentTitle({ field }: { field: FieldMetadata<string, ContentEditorFormData> }) {
    return (
        <Field
            labelProps={{
                htmlFor: field.id,
                className: 'sr-only',
                children: 'Title'
            }}
            inputProps={{
                autoFocus: true,
                name: field.name,
                id: field.id,
                type: 'text',
                placeholder: 'Untitled',
                defaultValue: field.value,
                className: 'w-full border-none px-0 text-4xl font-bold placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0 bg-transparent'
            }}
            errors={field.errors}
        />
    )
}

function ControlButtons({
    formId,
    isPending,
    onReset
}: {
    formId: string
    isPending: boolean
    onReset: () => void
}) {
    return (
        <div className="flex justify-end gap-4 mb-8">
            <Button
                type="button"
                variant="outline"
                onClick={onReset}
            >
                <Icon name="minus-circled" className="mr-2" />
                Reset
            </Button>
            <StatusButton
                form={formId}
                type="submit"
                disabled={isPending}
                status={isPending ? 'pending' : 'idle'}
                variant="default"
            >
                <Icon name="plus-circled" className="mr-2" />
                Save
            </StatusButton>
        </div>
    )
}

function DeleteContent({ id }: { id: string }) {
    const actionData = useActionData<ActionData>()
    const isPending = useIsPending()
    const [form] = useForm({
        id: 'delete-content',
        lastResult: actionData?.result,
    })

    return (
        <Form 
            method="POST" 
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate={form.noValidate}
        >
            <input type="hidden" name="intent" value="delete-content" />
            <input type="hidden" name="contentId" value={id} />
            <StatusButton
                form="delete-content"
                type="submit"
                variant="destructive"
                status={isPending ? 'pending' : (form.status ?? 'idle')}
                disabled={isPending}
            >
                <Icon name="trash" className="mr-2" />
                Delete
            </StatusButton>
            <ErrorList errors={form.errors || []} id={form.errorId} />
        </Form>
    )
}

function ContentEditor({ content }: ContentEditorProps) {
    const actionData = useActionData<ActionData>()
    const isPending = useIsPending()
    const formRef = useRef<HTMLFormElement>(null)

    const [form, { title, content: contentField, images }] = useForm<ContentEditorFormData>({
        id: 'content-editor',
        defaultValue: {
            id: content?.id,
            title: content?.title || '',
            content: content?.content || '',
            images: content?.images ?? [],
        },
        lastResult: actionData?.result,
        onValidate: ({ formData }) => {
            return parseWithZod(formData, { schema: ContentEditorSchema })
        },
        shouldRevalidate: 'onBlur',
    })

    const handleReset = () => {
        formRef.current?.reset()
        form.reset()
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <Form
                ref={formRef}
                method="POST"
                id={form.id}
                encType="multipart/form-data"
                onSubmit={form.onSubmit}
                noValidate={form.noValidate}
                className="space-y-8"
            >
                <button type="submit" className="hidden" />
                {content ? <input type="hidden" name="id" value={content.id} /> : null}

                <ControlButtons
                    formId={form.id}
                    isPending={isPending}
                    onReset={handleReset}
                />

                <div className="space-y-2">
                    <ContentTitle field={title} />
                </div>

                <div className="space-y-4">
                    <Button
                        className="w-full justify-center"
                        {...form.insert.getButtonProps({ name: images.name })}
                    >
                        <span aria-hidden>
                            <Icon name="upload" className="mr-2">Image</Icon>
                        </span>
                        Add Image
                    </Button>

                    <ContentEditImages
                        field={images}
                        form={form}
                    />
                </div>

                <div className="min-h-[500px]">
                    <Editor
                        name={contentField.name}
                        id={contentField.id}
                        defaultValue={contentField.value ?? ''}
                        onValueChange={(value) => {
                            const input = document.getElementById(contentField.id) as HTMLInputElement
                            if (input) {
                                input.value = value
                            }
                        }}
                    />
                </div>

                <div className="min-h-[32px]">
                    <ErrorList id={form.errorId} errors={form.errors || []} />
                </div>
            </Form>
        </div>
    )
}

export { ContentEditor, DeleteContent }
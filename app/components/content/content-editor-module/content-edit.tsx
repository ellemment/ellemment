// #app/components/content/content-editor-module/content-edit.tsx

import { useForm, type FieldMetadata } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { type Content, type ContentImage } from '@prisma/client'
import { type SerializeFrom } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { useRef } from 'react'

import { floatingToolbarClassName } from '#app/components/core/floating-toolbar'
import { ErrorList, Field } from '#app/components/core/forms'
import { Button } from '#app/components/ui/button'
import { Icon } from '#app/components/ui/icon'
import { StatusButton } from '#app/components/ui/status-button'
import { ContentEditorSchema, type ContentEditorData } from '#app/utils/content/content-schemas/schemas.js'
import { type FormFields, type ActionData } from '#app/utils/content/content-types/types.js'
import { useIsPending } from '#app/utils/misc'

import { ContentEditImages } from './image-modules/content-image-module'
import { Editor } from './tiptap-modules/editor'

interface ContentEditorProps {
    content?: SerializeFrom<
        Pick<Content, 'id' | 'title' | 'content'> & {
            images: Array<Pick<ContentImage, 'id' | 'altText'>>
        }
    >
}

function ContentEditTitle({ field }: { field: FieldMetadata<string, ContentEditorData, string[]> }) {
    return (
        <Field
            labelProps={{
                htmlFor: field.id,
                className: 'sr-only',
                children: 'Title'
            }}
            inputProps={{
                autoFocus: true,
                name: 'title',
                type: 'text',
                placeholder: 'Untitled',
                defaultValue: field.value,
                className: 'text-h1 font-bold'
            }}
            errors={field.errors}
        />
    )
}

function ContentEditBody({ field }: { field: FieldMetadata<string, ContentEditorData, string[]> }) {
    return (
        <div className="flex flex-col gap-1">
            <Editor
                name={field.name}
                id={field.id}
                defaultValue={field.value || ''}
                onValueChange={(value) => {
                    const input = document.getElementById(field.id) as HTMLInputElement
                    if (input) {
                        input.value = value
                    }
                }}
            />
            <div className="min-h-[32px] px-4 pb-3 pt-1">
                <ErrorList id={field.errorId} errors={field.errors} />
            </div>
        </div>
    )
}

function ContentEditToolbar({
    formId,
    isPending,
    reset
}: {
    formId: string
    isPending: boolean
    reset: { getButtonProps: () => Record<string, unknown> }
}) {
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

function DeleteContent({ id }: { id: string }) {
    const actionData = useActionData<ActionData>()
    const isPending = useIsPending()
    const [form] = useForm({
        id: 'delete-content',
        lastResult: actionData?.result,
    })

    return (
        <Form method="POST" {...form}>
            <input type="hidden" name="contentId" value={id} />
            <StatusButton
                type="submit"
                name="intent"
                value="delete-content"
                variant="destructive"
                status={isPending ? 'pending' : (form.status ?? 'idle')}
                disabled={isPending}
                className="w-full max-md:aspect-square max-md:px-0"
            >
                <Icon name="trash" className="scale-125 max-md:scale-150">
                    <span className="max-md:hidden">Delete</span>
                </Icon>
            </StatusButton>
            <ErrorList errors={form.errors} id={form.errorId} />
        </Form>
    )
}

function ContentForm({
    form,
    fields,
    content,
    isPending
}: {
    form: {
        id: string
        ref: React.RefObject<HTMLFormElement>
        reset: { getButtonProps: () => Record<string, unknown> }
        remove: {
            getButtonProps: (props: {
                name: string
                index: number
            }) => Record<string, unknown>
        }
        insert: { getButtonProps: (props: { name: string }) => Record<string, unknown> }
        errorId?: string
        errors?: string[]
    }
    fields: FormFields
    content?: SerializeFrom<
        Pick<Content, 'id' | 'title' | 'content'> & {
            images: Array<Pick<ContentImage, 'id' | 'altText'>>
        }
    >
    isPending: boolean
}) {
    return (
        <Form
            method="POST"
            className="flex h-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden px-10 pb-28 pt-12"
            ref={form.ref}
            id={form.id}
            encType="multipart/form-data"
        >
            <button type="submit" className="hidden" />
            {content ? <input type="hidden" name="id" value={content.id} /> : null}
            <div className="flex flex-col gap-1">
                <ContentEditTitle field={fields.title} />
                <ContentEditBody field={fields.content} />
                <ContentEditImages field={fields.images} form={form} />
            </div>
            <ErrorList id={form.errorId} errors={form.errors ?? []} />
            <ContentEditToolbar
                formId={form.id}
                isPending={isPending}
                reset={form.reset}
            />
        </Form>
    )
}

export function ContentEditor({ content }: ContentEditorProps) {
    const actionData = useActionData<ActionData>()
    const isPending = useIsPending()
    const formRef = useRef<HTMLFormElement>(null)

    const [form, fields] = useForm({
        id: 'content-editor',
        defaultValue: {
            id: content?.id,
            title: content?.title || '',
            content: content?.content,
            images: content?.images ?? [{}],
        },
        lastResult: actionData?.result,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: ContentEditorSchema })
        },
        shouldRevalidate: 'onBlur',
    })

    const formProps = {
        id: form.id,
        ref: formRef,
        reset: form.reset,
        remove: form.remove,
        insert: form.insert,
        errorId: form.errorId,
        errors: form.errors
    }

    return (
        <div className="absolute inset-0">
            <ContentForm
                form={formProps}
                fields={fields}
                content={content}
                isPending={isPending}
            />
        </div>
    )
}

export {
    DeleteContent,
    ContentForm,
    ContentEditImages,
    ContentEditTitle,
}
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
import { ContentEditorSchema } from '#app/utils/content/content-schemas/schemas.js'
import { type ActionData } from '#app/utils/content/content-types/types.js'
import { useIsPending } from '#app/utils/misc'
import { ContentEditImages } from './image-modules/content-image-module'
import { Editor } from './tiptap-modules/editor'

// Define the form data type based on schema shape
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

function ToolbarButtons({
    formId,
    isPending,
    onReset
}: {
    formId: string
    isPending: boolean
    onReset: () => void
}) {
    return (
        <div className={floatingToolbarClassName}>
            <div className="grid flex-1 grid-cols-2 justify-end gap-2 min-[525px]:flex md:gap-4">
                <Button
                    type="button"
                    variant="default"
                    onClick={onReset}
                    className="min-[525px]:max-md:aspect-square min-[525px]:max-md:px-0 bg-primary/80 text-primary-foreground hover:bg-primary/50"
                >
                    <Icon name="minus-circled" className="scale-125 max-md:scale-150">
                        <span className="max-md:hidden">Reset</span>
                    </Icon>
                </Button>
                <StatusButton
                    form={formId}
                    type="submit"
                    disabled={isPending}
                    status={isPending ? 'pending' : 'idle'}
                    className="min-[525px]:max-md:aspect-square min-[525px]:max-md:px-0"
                >
                    <Icon name="plus-circled" className="scale-125 max-md:scale-150">
                        <span className="max-md:hidden">Save</span>
                    </Icon>
                </StatusButton>
            </div>
        </div>
    )
}


interface ContentFormProps {
    content?: ContentEditorProps['content']
    fields: {
        title: FieldMetadata<string, ContentEditorFormData>
        content: FieldMetadata<string, ContentEditorFormData>
        images: FieldMetadata<ContentEditorFormData['images'], ContentEditorFormData>
    }
    form: ReturnType<typeof useForm<ContentEditorFormData>>[0]
    formRef: React.RefObject<HTMLFormElement>
    isPending: boolean
    handleReset: () => void
}

function ContentForm({
    content,
    form,
    fields,
    formRef,
    isPending,
    handleReset
}: ContentFormProps) {
    return (
        <Form
            ref={formRef}
            method="POST"
            className="mx-auto px-4 py-8 sm:px-8"
            id={form.id}
            encType="multipart/form-data"
            onSubmit={form.onSubmit}
            noValidate={form.noValidate}
        >
            <div className="space-y-8">
                <button type="submit" className="hidden" />
                {content ? <input type="hidden" name="id" value={content.id} /> : null}

                <div className="space-y-2">
                    <ContentTitle field={fields.title} />
                </div>

                <Button
                    className="mt-3"
                    {...form.insert.getButtonProps({ name: fields.images.name })}
                >
                    <span aria-hidden>
                        <Icon name="upload">Image</Icon>
                    </span>{' '}
                    <span className="sr-only">Add image</span>
                </Button>

                <div>
                    <ContentEditImages
                        field={fields.images}
                        form={form}
                    />
                </div>

                <div className="min-h-[500px]">
                    <Editor
                        name={fields.content.name}
                        id={fields.content.id}
                        defaultValue={fields.content.value ?? ''}
                        onValueChange={(value) => {
                            const input = document.getElementById(fields.content.id) as HTMLInputElement
                            if (input) {
                                input.value = value
                            }
                        }}
                    />
                </div>

                <div className="min-h-[32px]">
                    <ErrorList id={form.errorId} errors={form.errors || []} />
                </div>
                <ToolbarButtons
                    formId={form.id}
                    isPending={isPending}
                    onReset={handleReset}
                />
            </div>
        </Form>
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
          className="w-full max-md:aspect-square max-md:px-0"
        >
          <Icon name="trash" className="scale-125 max-md:scale-150">
            <span className="max-md:hidden">Delete</span>
          </Icon>
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
        <div className="bg-background md:rounded-3xl">
            <ContentForm
                content={content}
                form={form}
                fields={{ title, content: contentField, images }}
                formRef={formRef}
                isPending={isPending}
                handleReset={handleReset}
            />
        </div>
    )
}

export { ContentEditor, DeleteContent }
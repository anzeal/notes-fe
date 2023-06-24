"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { OutputData } from "@editorjs/editorjs"
import { MoveHorizontal } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"

const SimpleEditor = dynamic(() => import("./simple-editor").then((mod) => mod.SimpleEditor), {
  ssr: false,
})

type EditorData = {
  title?: string
  content?: OutputData
}

interface EditorProps {
  data?: EditorData
  onChange?: (data?: EditorData) => void
  holder: string
}

export const Editor = ({ data, onChange, holder }: EditorProps) => {
  const [editorWidth, setEditorWidth] = useState<"default" | "full">("default")
  const { register, control, watch, reset, getValues } = useForm<EditorData>({
    defaultValues: {
      content: data?.content,
      title: data?.title,
    },
  })

  useEffect(() => {
    const { unsubscribe } = watch((formData) => {
      onChange?.({
        content: formData.content as OutputData,
        title: formData.title,
      })
    })
    return () => unsubscribe()
  }, [onChange, watch])

  useEffect(() => {
    reset({
      ...getValues(),
      title: data?.title,
    })
  }, [data?.title, getValues, reset])

  return (
    <div
      className={
        editorWidth === "default"
          ? "prose prose-neutral mx-auto w-[720px] max-w-none p-4 transition-all dark:prose-invert"
          : "prose prose-neutral mx-auto w-full max-w-none p-4 transition-all dark:prose-invert"
      }
    >
      {editorWidth === "default" ? (
        <div
          className="flex h-6 cursor-pointer select-none items-center gap-2"
          onClick={() => setEditorWidth("full")}
        >
          <MoveHorizontal className="h-4 w-4 text-shade-secondary" />
          <p className="text-[13px] font-medium">Wide Layout</p>
        </div>
      ) : (
        <div
          className="flex h-6 cursor-pointer select-none items-center gap-2"
          onClick={() => setEditorWidth("default")}
        >
          <MoveHorizontal className="h-4 w-4 text-shade-secondary" />
          <p className="text-[13px] font-medium">Default Layout</p>
        </div>
      )}

      <TextareaAutosize
        autoFocus
        id="title"
        defaultValue={data?.title}
        placeholder="Untitled"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            return false
          }
        }}
        className="min-h-12 w-full resize-none appearance-none overflow-hidden bg-transparent py-4 text-5xl font-bold leading-[3.75rem] focus:outline-none"
        {...register("title")}
      />
      <Controller
        name="content"
        control={control}
        render={({ field: { value, onChange: editorOnChange } }) => (
          <SimpleEditor onChange={editorOnChange} data={value} holder={holder} />
        )}
      />
    </div>
  )
}

export default Editor
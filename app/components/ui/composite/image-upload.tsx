// #app/components/ui/composite/image-upload.tsx

import { X, FileImage, UploadCloud } from "lucide-react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "#app/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "#app/components/ui/dialog"
import { Input } from "#app/components/ui/input"
import { Progress } from "#app/components/ui/progress"
import { ScrollArea } from "#app/components/ui/scroll-area"

interface FileUploadProgress {
  progress: number
  file: File
}

interface ImageUploadProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImageUpload({ onFilesSelected, maxFiles = 5, open, onOpenChange }: ImageUploadProps) {
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const simulateProgress = (file: File) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setFilesToUpload(prev => 
        prev.map(item => 
          item.file === file 
            ? { ...item, progress: Math.min(progress, 100) }
            : item
        )
      )

      if (progress >= 100) {
        clearInterval(interval)
        setUploadedFiles(prev => [...prev, file])
        setFilesToUpload(prev => prev.filter(item => item.file !== file))
      }
    }, 200)
  }

  const removeFile = (file: File) => {
    setFilesToUpload(prev => prev.filter(item => item.file !== file))
    setUploadedFiles(prev => prev.filter(f => f !== file))
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, maxFiles - uploadedFiles.length)
    
    setFilesToUpload(prev => [
      ...prev,
      ...newFiles.map(file => ({
        progress: 0,
        file,
      }))
    ])

    newFiles.forEach(file => {
      simulateProgress(file)
    })
  }, [maxFiles, uploadedFiles.length])

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/webp': []
    },
    maxFiles: maxFiles - uploadedFiles.length
  })

  const handleDone = () => {
    onFilesSelected(uploadedFiles)
    onOpenChange(false)
    setFilesToUpload([])
    setUploadedFiles([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Images</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div>
            <label
              {...getRootProps()}
              className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="text-center">
                <div className="border p-2 rounded-md max-w-min mx-auto">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              <Input {...getInputProps()} className="hidden" />
            </label>
          </div>

          {filesToUpload.length > 0 && (
            <div>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <div className="space-y-2">
                  {filesToUpload.map((fileUpload) => (
                    <div
                      key={fileUpload.file.name}
                      className="flex items-center gap-2 rounded-lg border p-2 relative group"
                    >
                      <FileImage className="h-8 w-8 text-blue-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {fileUpload.file.name}
                        </p>
                        <Progress value={fileUpload.progress} className="h-1" />
                      </div>
                      <button
                        onClick={() => removeFile(fileUpload.file)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center gap-2 rounded-lg border p-2 relative group"
                    >
                      <FileImage className="h-8 w-8 text-green-500" />
                      <p className="text-sm font-medium truncate flex-1">
                        {file.name}
                      </p>
                      <button
                        onClick={() => removeFile(file)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDone}
              disabled={uploadedFiles.length === 0}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
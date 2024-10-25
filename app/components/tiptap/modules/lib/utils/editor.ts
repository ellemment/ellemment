import { type EditorView } from "@tiptap/pm/view";
import { toast } from "react-hot-toast";

export const handleImageUpload = async (
  file: File,
  view: EditorView,
  event: ClipboardEvent | DragEvent | Event
): Promise<void> => {
  // Check if the file is an image
  if (!file.type.includes("image/")) {
    toast.error("File type not supported.");
    return;
  }

  // Check if the file size is less than 50MB
  if (file.size / 1024 / 1024 > 50) {
    toast.error("File size too big (max 50MB).");
    return;
  }

  const insertImage = (url: string): void => {
    const schema = view.state.schema;
    const imageNode = schema.nodes.image;
    
    if (!imageNode) {
      console.error('Image node is not defined in the schema');
      return;
    }

    const createImageNode = () =>
      imageNode.create({
        src: url,
        alt: file.name,
        title: file.name,
      });

    try {
      // for paste events
      if (event instanceof ClipboardEvent) {
        view.dispatch(
          view.state.tr.replaceSelectionWith(createImageNode())
        );
      }
      // for drag and drop events
      else if (event instanceof DragEvent) {
        const coordinates = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        const transaction = view.state.tr.insert(
          coordinates?.pos || 0,
          createImageNode()
        );
        view.dispatch(transaction);
      }
      // for input upload events
      else if (event instanceof Event) {
        view.dispatch(
          view.state.tr.replaceSelectionWith(createImageNode())
        );
      }
    } catch (error) {
      console.error('Error inserting image:', error);
      toast.error('Failed to insert image');
    }
  };

  try {
    const uploadPromise = fetch("/api/ai/upload", {
      method: "POST",
      headers: {
        "content-type": file?.type || "application/octet-stream",
        "x-vercel-filename": file?.name || "image.png",
      },
      body: file,
    });

    await toast.promise(
      uploadPromise.then(async (res) => {
        if (res.status === 200) {
          // Successfully uploaded image
          const { url } = await res.json();
          
          // Return a promise that resolves when the image is loaded
          return new Promise<void>((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = () => {
              insertImage(url);
              resolve();
            };
            image.onerror = () => reject(new Error('Failed to load image'));
          });
        } else if (res.status === 401) {
          // No blob store configured
          return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                insertImage(e.target.result as string);
                resolve();
              } else {
                reject(new Error('Failed to read image'));
              }
            };
            reader.onerror = () => reject(new Error('Failed to read image'));
            reader.readAsDataURL(file);
          });
        } else {
          throw new Error(`Error uploading image. Please try again.`);
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e: Error) => e.message,
      }
    );
  } catch (error) {
    console.error('Error handling image upload:', error);
    toast.error('Failed to upload image');
  }
};
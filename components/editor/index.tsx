"use client";
import ToolBar from "@/components/editor/ToolBar";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import axios from "axios";
import EditLink from "./Link/EditLink";
import GalleryModel, { ImageSelectionResult } from "./GalleryModel";
import TipTapImage from "@tiptap/extension-image";
import SEOForm, { SeoResult } from "./SEOForm";
import ActionButton from "../common/ActionButton";
import { ThumbnailSelector } from "./ThumbnailSelector";
export interface FinalPost extends SeoResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
}

interface Props {
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: FinalPost): void;
}

export default function Editor({
  initialValue,
  btnTitle = "Submit",
  busy = false,
  onSubmit,
}: Props) {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        allowFullscreen: true,
        HTMLAttributes: {
          class: "mx-auto width-fixed",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) {
          setSelectionRange(selectionRange);
        }
      },
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });
  const updateSeoValue = (result: SeoResult) => {
    setPost({ ...post, ...result });
    //console.log(post);
  };
  const updateTitle = ({ target }: { target: HTMLInputElement }) =>
    setPost({ ...post, title: target.value });
  const updateThumbnail = (file: File) => setPost({ ...post, thumbnail: file });
  const fetchImages = async () => {
    const { data } = await axios("/api/image");
    setImages(data.images);
  };

  const handleImageUpload = async (image: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post("/api/image", formData);
    setUploading(false);
    setImages([data, ...images]);
  };
  const handleImageSelection = (result: ImageSelectionResult) => {
    console.log(result);
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };
  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };
  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);
  useEffect(() => {
    fetchImages();
  }, []);
  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      editor?.commands.setContent(initialValue.content);

      const { meta, slug, tags } = initialValue;
      setSeoInitialValue({ meta, slug, tags });
    }
  }, [initialValue, editor]);

  return (
    <>
      <div className='flex items-center justify-between mb-3'>
        <ThumbnailSelector
          initialValue={post.thumbnail as string}
          onChange={updateThumbnail}
        />
        <div className='hidden sm:inline-block'>
          <ActionButton busy={busy} title={btnTitle} onClick={handleSubmit} />
        </div>
      </div>
      <input
        type='text'
        className='outline-none bg-transparent w-full border-0 border-b-[1px] border-orange-500 dark:border-secondary-light text-4xl font-semibold text-green-700 dark:text-primary mb-3'
        placeholder='Title'
        onChange={updateTitle}
        value={post.title}
      />
      <ToolBar editor={editor} onOpenImageClick={() => setShowGallery(true)} />
      <div className='h-[1px] w-full bg-orange-500 dark:bg-secondary-light my-3' />
      {editor ? <EditLink editor={editor} /> : null}
      <EditorContent editor={editor} className='h-500' />
      <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />
      <SEOForm
        onChange={updateSeoValue}
        title={post.title}
        initialValue={seoInitialValue}
      />
      <GalleryModel
        uploading={uploading}
        images={images}
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        onFileSelect={handleImageUpload}
      />
    </>
  );
}

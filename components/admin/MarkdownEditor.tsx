"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MarkdownEditorProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name: string;
    id: string;
}

export function MarkdownEditor({
    value,
    onChange,
    name,
    id,
}: MarkdownEditorProps) {
    return (
        <Tabs defaultValue="write" className="w-full">
            <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
                <Textarea
                    id={id}
                    name={name}
                    className="min-h-[200px] font-mono"
                    placeholder="Markdown supported content..."
                    value={value}
                    onChange={onChange}
                    required
                />
            </TabsContent>
            <TabsContent
                value="preview"
                className="prose dark:prose-invert max-w-none p-4 border rounded-md min-h-[200px]"
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {value || "Nothing to preview yet."}
                </ReactMarkdown>
            </TabsContent>
        </Tabs>
    );
}

import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEditMode } from "@/contexts/EditModeContext";
import { useInlineEdit } from "@/hooks/useInlineEdit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Loader2 } from "lucide-react";
import type { Content } from "@shared/schema";

interface InlineEditProps {
  contentKey: string;
  sectionName: string;
  pageName: string;
  defaultValue?: string;
  type?: "text" | "heading" | "paragraph" | "image" | "button";
  className?: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export function InlineEdit({
  contentKey,
  sectionName,
  pageName,
  defaultValue = "",
  type = "text",
  className = "",
  children,
  as: Component = "div",
}: InlineEditProps) {
  const { isEditMode } = useEditMode();
  const [hovering, setHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch the content data
  const { data: pages = [] } = useQuery<any[]>({
    queryKey: ["/api/cms/pages"],
  });

  const page = pages.find((p: any) => p.name === pageName);
  const { data: sections = [] } = useQuery<any[]>({
    queryKey: ["/api/cms/sections/page", page?.id],
    enabled: !!page?.id,
  });

  const section = sections.find((s: any) => s.name === sectionName);
  const { data: content = [] } = useQuery<Content[]>({
    queryKey: ["/api/cms/content/section", section?.id],
    enabled: !!section?.id,
  });

  const contentItem = content.find((c: Content) => c.key === contentKey);
  const displayValue = contentItem?.value || defaultValue;

  const {
    isEditing,
    setIsEditing,
    value,
    setValue,
    handleSave,
    handleCancel,
    handleKeyDown,
    isLoading,
  } = useInlineEdit({
    contentId: contentItem?.id || "",
    initialValue: displayValue,
    contentType: type,
    sectionId: section?.id || "",
  });

  useEffect(() => {
    if (isEditing) {
      if (type === "paragraph" && textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
      } else if (inputRef.current) {
        inputRef.current.focus();
        if (type !== "image") {
          inputRef.current.select();
        }
      }
    }
  }, [isEditing, type]);

  const handleClick = () => {
    if (isEditMode && contentItem?.id) {
      setIsEditing(true);
    }
  };

  const renderEditingInput = () => {
    if (type === "paragraph") {
      return (
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`${className} border-2 border-orange-300 bg-white resize-none`}
          disabled={isLoading}
          rows={4}
        />
      );
    }

    return (
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`${className} border-2 border-orange-300 bg-white`}
        disabled={isLoading}
        type={type === "image" ? "url" : "text"}
      />
    );
  };

  const renderDisplayContent = () => {
    if (type === "image") {
      return (
        <img
          src={displayValue || "/placeholder-image.png"}
          alt={contentKey}
          className={className}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-image.png";
          }}
        />
      );
    }

    if (type === "heading") {
      return React.createElement(
        Component,
        { className: `${className} font-bold text-2xl` },
        displayValue || children
      );
    }

    if (type === "paragraph") {
      return React.createElement(
        Component,
        { className: `${className} leading-relaxed` },
        displayValue || children
      );
    }

    if (type === "button") {
      return (
        <Button className={className}>
          {displayValue || children}
        </Button>
      );
    }

    return React.createElement(
      Component,
      { className },
      displayValue || children
    );
  };

  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {renderEditingInput()}
        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
            data-testid={`save-${contentKey}`}
          >
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Save className="w-3 h-3" />
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            data-testid={`cancel-${contentKey}`}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-block group ${isEditMode ? "cursor-pointer" : ""}`}
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      data-testid={`inline-edit-${contentKey}`}
    >
      {renderDisplayContent()}
      
      {isEditMode && hovering && contentItem?.id && (
        <div className="absolute -top-8 left-0 z-10">
          <Badge className="bg-orange-500 text-white text-xs px-2 py-1 flex items-center gap-1">
            <Edit className="w-3 h-3" />
            Click to edit {type}
          </Badge>
        </div>
      )}
      
      {isEditMode && !contentItem?.id && (
        <div className="absolute -top-8 left-0 z-10">
          <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-100">
            No content found: {contentKey}
          </Badge>
        </div>
      )}
    </div>
  );
}
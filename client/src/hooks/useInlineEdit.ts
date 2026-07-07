import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface UseInlineEditProps {
  contentId: string;
  initialValue: string;
  contentType: string;
  sectionId: string;
}

export function useInlineEdit({ contentId, initialValue, contentType, sectionId }: UseInlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (newValue: string) => {
      const response = await fetch(`/api/cms/content/${contentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: newValue }),
      });
      if (!response.ok) throw new Error("Failed to update content");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/content/section", sectionId] });
      toast({
        title: "Content Updated",
        description: "Changes saved successfully",
      });
      setIsEditing(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (value !== initialValue) {
      updateMutation.mutate(value);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && contentType !== "paragraph") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return {
    isEditing,
    setIsEditing,
    value,
    setValue,
    handleSave,
    handleCancel,
    handleKeyDown,
    isLoading: updateMutation.isPending,
  };
}
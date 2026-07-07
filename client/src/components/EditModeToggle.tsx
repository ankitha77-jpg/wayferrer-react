import { useEditMode } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, EyeOff } from "lucide-react";

export function EditModeToggle() {
  const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isEditMode ? "default" : "outline"}
        size="sm"
        onClick={toggleEditMode}
        className={isEditMode ? "bg-orange-500 hover:bg-orange-600" : ""}
        data-testid="edit-mode-toggle"
      >
        {isEditMode ? (
          <>
            <EyeOff className="w-4 h-4 mr-2" />
            Exit Edit Mode
          </>
        ) : (
          <>
            <Edit className="w-4 h-4 mr-2" />
            Edit Mode
          </>
        )}
      </Button>
      
      {isEditMode && (
        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
          <Eye className="w-3 h-3 mr-1" />
          Click to edit content
        </Badge>
      )}
    </div>
  );
}
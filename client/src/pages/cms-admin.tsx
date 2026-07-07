import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Edit, Plus, Trash2, Save, Upload, Settings, Home, Globe, Image, AlertCircle, CheckCircle, Clock, Eye, EyeOff } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import type { Page, Section, Content } from "@shared/schema";

export default function CMSAdminPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [showAddContentDialog, setShowAddContentDialog] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Queries
  const { data: pages = [], isLoading: pagesLoading } = useQuery<Page[]>({
    queryKey: ["/api/cms/pages"],
  });

  const { data: sections = [], isLoading: sectionsLoading } = useQuery<Section[]>({
    queryKey: ["/api/cms/sections/page", selectedPage],
    enabled: !!selectedPage,
  });

  const { data: content = [], isLoading: contentLoading } = useQuery<Content[]>({
    queryKey: ["/api/cms/content/section", selectedSection],
    enabled: !!selectedSection,
  });

  // New query for all page content
  const { data: pageContent = [], isLoading: pageContentLoading } = useQuery<{ section: Section; content: Content[] }[]>({
    queryKey: ["/api/cms/content/page", selectedPage],
    enabled: !!selectedPage,
  });

  // Mutations
  const updateContentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Content> }) => {
      const response = await fetch(`/api/cms/content/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update content");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/content/section", selectedSection] });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/content/page", selectedPage] });
      toast({
        title: "Content Updated",
        description: "Your changes have been saved successfully.",
      });
      setEditingContent(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addContentMutation = useMutation({
    mutationFn: async (data: Partial<Content>) => {
      const response = await fetch("/api/cms/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add content");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/content/section", selectedSection] });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/content/page", selectedPage] });
      toast({
        title: "Content Added",
        description: "New content has been added successfully.",
      });
      setShowAddContentDialog(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/cms/content/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete content");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/content/section", selectedSection] });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/content/page", selectedPage] });
      toast({
        title: "Content Deleted",
        description: "Content has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSaveContent = (data: Partial<Content>) => {
    if (editingContent) {
      updateContentMutation.mutate({ id: editingContent.id, data });
    }
  };

  const handleAddContent = (data: Partial<Content>) => {
    addContentMutation.mutate({
      ...data,
      sectionId: selectedSection,
      sortOrder: content.length,
    });
  };

  const handleDeleteContent = (id: string) => {
    if (confirm("Are you sure you want to delete this content item? This action cannot be undone.")) {
      deleteContentMutation.mutate(id);
    }
  };

  // Set default page when pages load
  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      // Default to Home Page
      const homePage = pages.find(p => p.title === "Home Page") || pages[0];
      setSelectedPage(homePage.id);
    }
  }, [pages, selectedPage]);

  // Auto-save effect
  useEffect(() => {
    if (unsavedChanges) {
      const timer = setTimeout(() => {
        setUnsavedChanges(false);
        setLastSaved(new Date());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [unsavedChanges]);

  // Filter content based on search
  const filteredContent = content.filter(item =>
    searchQuery === "" ||
    item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">
              <GradientText>CMS Admin Panel</GradientText>
            </h1>
            <div className="flex items-center gap-4">
              {/* Status Indicators */}
              <div className="flex items-center gap-2">
                {lastSaved && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Saved {lastSaved.toLocaleTimeString()}
                  </Badge>
                )}
                {unsavedChanges && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                    <Clock className="w-3 h-3 mr-1" />
                    Unsaved changes
                  </Badge>
                )}
              </div>
              
              {/* Preview Toggle */}
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
                data-testid="preview-toggle"
              >
                {previewMode ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Edit Mode
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Mode
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-600">
              Manage your website content, images, and text across all pages and sections.
            </p>
            
            {/* Search Bar */}
            {selectedSection && (
              <div className="max-w-md">
                <Input
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  data-testid="content-search"
                />
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">{pages.length}</div>
                <div className="text-sm text-gray-600">Total Pages</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{sections.length}</div>
                <div className="text-sm text-gray-600">Active Sections</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{content.length}</div>
                <div className="text-sm text-gray-600">Content Items</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {filteredContent.filter(c => c.type === 'image').length}
                </div>
                <div className="text-sm text-gray-600">Images</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar - Page Selection */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Pages
                </CardTitle>
                <CardDescription>Select a page to edit</CardDescription>
              </CardHeader>
              <CardContent>
                {pagesLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pages.map((page: Page) => (
                      <Button
                        key={page.id}
                        variant={selectedPage === page.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          setSelectedPage(page.id);
                          setSelectedSection("");
                          setEditingContent(null);
                        }}
                        data-testid={`page-button-${page.name}`}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        {page.title}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sections */}
            {selectedPage && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Sections
                  </CardTitle>
                  <CardDescription>Choose a section to edit</CardDescription>
                </CardHeader>
                <CardContent>
                  {sectionsLoading ? (
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {sections.map((section: Section) => (
                        <Button
                          key={section.id}
                          variant={selectedSection === section.id ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedSection(section.id)}
                          data-testid={`section-button-${section.name}`}
                        >
                          {section.displayName}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {!selectedPage ? (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Globe className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">Select a Page to Start</h3>
                    <p className="text-gray-600">
                      Choose a page from the sidebar to begin editing content
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Page Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">
                          {pages.find((p: Page) => p.id === selectedPage)?.title} - All Content
                        </CardTitle>
                        <CardDescription>
                          All sections and content organized from top to bottom as they appear on the website
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* All Sections and Content */}
                {pageContentLoading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <div className="h-32 bg-gray-200 rounded animate-pulse mb-4" />
                          <div className="space-y-2">
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : pageContent.length === 0 ? (
                  <Card>
                    <CardContent className="flex items-center justify-center h-48">
                      <div className="text-center">
                        <Edit className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold mb-2">No Content Yet</h3>
                        <p className="text-gray-600 mb-4">
                          This page doesn't have any content. Add sections and content to get started.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-8">
                    {pageContent.map((sectionData: { section: Section; content: Content[] }, sectionIndex: number) => (
                      <div key={sectionData.section.id} className="space-y-4">
                        {/* Section Header */}
                        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-xl text-orange-800 flex items-center gap-2">
                                  <Settings className="w-5 h-5" />
                                  {sectionData.section.displayName}
                                </CardTitle>
                                <CardDescription className="text-orange-600">
                                  Section {sectionIndex + 1} • {sectionData.content.length} content items
                                </CardDescription>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedSection(sectionData.section.id);
                                  setShowAddContentDialog(true);
                                }}
                                className="bg-white hover:bg-orange-50 border-orange-200"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Content
                              </Button>
                            </div>
                          </CardHeader>
                        </Card>

                        {/* Section Content */}
                        {sectionData.content.length === 0 ? (
                          <Card className="border-dashed border-2 border-gray-300">
                            <CardContent className="flex items-center justify-center h-32">
                              <div className="text-center">
                                <p className="text-gray-500 mb-2">No content in this section</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedSection(sectionData.section.id);
                                    setShowAddContentDialog(true);
                                  }}
                                  className="text-orange-600 border-orange-300 hover:bg-orange-50"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add First Content
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ) : (
                          <div className="space-y-4 ml-4">
                            {sectionData.content.map((item: Content, contentIndex: number) => (
                              <Card key={item.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <CardTitle className="text-lg">{item.displayName}</CardTitle>
                                        <Badge variant="secondary" className="text-xs">
                                          {item.type}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs text-orange-600">
                                          #{contentIndex + 1}
                                        </Badge>
                                      </div>
                                      <CardDescription>
                                        Key: {item.key} • Sort: {item.sortOrder} • 
                                        Updated: {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Never'}
                                      </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setSelectedSection(sectionData.section.id);
                                          setEditingContent(item);
                                        }}
                                        data-testid={`edit-content-${item.key}`}
                                        className="hover:bg-orange-50 hover:border-orange-200"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteContent(item.id)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200"
                                        data-testid={`delete-content-${item.key}`}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  {item.type === "image" ? (
                                    <div className="space-y-3">
                                      <div className="relative">
                                        <img
                                          src={item.value}
                                          alt={item.displayName}
                                          className="w-full max-w-md h-40 object-cover rounded-lg border shadow-sm"
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/placeholder-image.png';
                                          }}
                                        />
                                        <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                                          <Image className="w-3 h-3 mr-1" />
                                          Image
                                        </Badge>
                                      </div>
                                      <div className="bg-gray-50 p-3 rounded border">
                                        <p className="text-xs font-mono text-gray-600 break-all">{item.value}</p>
                                      </div>
                                    </div>
                                  ) : item.type === "heading" ? (
                                    <div className="space-y-2">
                                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h3 className="text-xl font-bold text-gray-800">{item.value}</h3>
                                      </div>
                                      <p className="text-xs text-gray-500">Preview as heading</p>
                                    </div>
                                  ) : item.type === "paragraph" ? (
                                    <div className="space-y-2">
                                      <div className="bg-gray-50 p-4 rounded-lg border">
                                        <p className="text-gray-700 leading-relaxed">{item.value}</p>
                                      </div>
                                      <p className="text-xs text-gray-500">Preview as paragraph</p>
                                    </div>
                                  ) : item.type === "button" ? (
                                    <div className="space-y-2">
                                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                        <Button className="bg-orange-500 hover:bg-orange-600">
                                          {item.value}
                                        </Button>
                                      </div>
                                      <p className="text-xs text-gray-500">Preview as button</p>
                                    </div>
                                  ) : (
                                    <div className="bg-gray-50 p-4 rounded-lg border">
                                      <pre className="whitespace-pre-wrap text-sm text-gray-700">{item.value}</pre>
                                    </div>
                                  )}
                                  
                                  {/* Content Statistics */}
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                      <span>
                                        Characters: {item.value.length} | 
                                        Words: {item.value.split(' ').length}
                                      </span>
                                      <span>
                                        ID: {item.id.slice(-8)}
                                      </span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit Content Dialog */}
        <Dialog open={!!editingContent} onOpenChange={(open) => !open && setEditingContent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Content: {editingContent?.displayName}</DialogTitle>
              <DialogDescription>
                Update the content for this {editingContent?.type} field.
              </DialogDescription>
            </DialogHeader>
            {editingContent && (
              <EditContentForm
                content={editingContent}
                onSave={handleSaveContent}
                onCancel={() => setEditingContent(null)}
                isLoading={updateContentMutation.isPending}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Add Content Dialog */}
        <Dialog open={showAddContentDialog} onOpenChange={setShowAddContentDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Content</DialogTitle>
              <DialogDescription>
                Add a new content item to this section.
              </DialogDescription>
            </DialogHeader>
            <AddContentForm
              onSave={handleAddContent}
              onCancel={() => setShowAddContentDialog(false)}
              isLoading={addContentMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Edit Content Form Component
interface EditContentFormProps {
  content: Content;
  onSave: (data: Partial<Content>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

function EditContentForm({ content, onSave, onCancel, isLoading }: EditContentFormProps) {
  const [value, setValue] = useState(content.value);
  const [displayName, setDisplayName] = useState(content.displayName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ value, displayName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter display name"
          data-testid="content-display-name"
        />
      </div>
      
      <div>
        <Label htmlFor="value">Content Value</Label>
        {content.type === "image" ? (
          <div className="space-y-2">
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter image URL"
              data-testid="content-value"
            />
            {value && (
              <img
                src={value}
                alt="Preview"
                className="w-full max-w-md h-32 object-cover rounded border"
              />
            )}
          </div>
        ) : (
          <Textarea
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter content value"
            rows={6}
            data-testid="content-value"
          />
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600"
          data-testid="save-content-button"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

// Add Content Form Component
interface AddContentFormProps {
  onSave: (data: Partial<Content>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

function AddContentForm({ onSave, onCancel, isLoading }: AddContentFormProps) {
  const [type, setType] = useState<string>("text");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ type, key, value, displayName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="type">Content Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger data-testid="content-type-select">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="heading">Heading</SelectItem>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="button">Button</SelectItem>
            <SelectItem value="list">List</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="key">Content Key</Label>
        <Input
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter unique key (e.g. hero_title)"
          required
          data-testid="content-key"
        />
      </div>

      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter display name"
          required
          data-testid="content-display-name"
        />
      </div>
      
      <div>
        <Label htmlFor="value">Content Value</Label>
        {type === "image" ? (
          <div className="space-y-2">
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter image URL"
              required
              data-testid="content-value"
            />
            {value && (
              <img
                src={value}
                alt="Preview"
                className="w-full max-w-md h-32 object-cover rounded border"
              />
            )}
          </div>
        ) : (
          <Textarea
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter content value"
            rows={6}
            required
            data-testid="content-value"
          />
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !key || !displayName || !value}
          className="bg-orange-500 hover:bg-orange-600"
          data-testid="add-content-submit"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
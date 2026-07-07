import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Image, 
  Edit, 
  FileImage, 
  Upload, 
  CheckCircle, 
  Info, 
  ExternalLink,
  Settings,
  Eye,
  Download
} from "lucide-react";
export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState("overview");

  const imageFiles = [
    {
      name: "logo.png",
      description: "Website logo in navigation",
      size: "200x200 pixels",
      purpose: "Displays in the top navigation bar"
    },
    {
      name: "profile-photo.jpg", 
      description: "Your profile picture",
      size: "400x400 pixels",
      purpose: "Shows on About page and author sections"
    },
    {
      name: "book-cover.jpg",
      description: "Book cover image",
      size: "600x800 pixels", 
      purpose: "Displays in the book promotion section"
    },
    {
      name: "world-map.png",
      description: "Interactive world map",
      size: "1200x800 pixels",
      purpose: "Shows countries you've visited"
    }
  ];

  const quickActions = [
    {
      title: "Edit Website Content",
      description: "Click directly on any text to edit it",
      action: "Go to Homepage + Enable Edit Mode",
      link: "/?edit=true",
      icon: Edit,
      color: "bg-blue-500"
    },
    {
      title: "Manage All Content",
      description: "Full content management system",
      action: "Open CMS Dashboard",
      link: "/cms-admin",
      icon: Settings,
      color: "bg-green-500"
    },
    {
      title: "View Live Website",
      description: "See your website as visitors do",
      action: "View Website",
      link: "/",
      icon: Eye,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Wayfarer Footprints - Client Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your travel website - no technical knowledge required!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                <Button asChild className="w-full">
                  <a href={action.link} target={action.link.includes('edit=true') ? '_blank' : '_self'}>
                    {action.action}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  How to Update Your Website
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription>
                    Your website is ready! You can update content and images without any coding knowledge.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">🖼️ To Replace Images:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Click the "Images" tab above</li>
                      <li>Find the image you want to replace</li>
                      <li>Upload your new image with the exact same filename</li>
                      <li>Refresh your website to see changes</li>
                    </ol>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">✏️ To Edit Text Content:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Click "Edit Website Content" above</li>
                      <li>Click the "Edit Mode" button that appears</li>
                      <li>Click directly on any text to edit it</li>
                      <li>Press Enter or click Save when done</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🆘 Need Help?</h4>
                  <p className="text-sm text-gray-700">
                    All changes are automatically saved. If something goes wrong, you can always revert 
                    using the CMS Dashboard or contact your web developer.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileImage className="w-5 h-5" />
                  Image Management
                </CardTitle>
                <CardDescription>
                  Replace any image by uploading a new file with the same name to maintain your website design.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <Upload className="w-4 h-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Always use the exact same filename when replacing images. 
                    Keep images under 2MB for best performance.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {imageFiles.map((file, index) => (
                    <Card key={index} className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Image className="w-5 h-5 text-blue-500" />
                            <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                              {file.name}
                            </code>
                          </div>
                          <Badge variant="secondary">{file.size}</Badge>
                        </div>
                        <h4 className="font-medium mb-1">{file.description}</h4>
                        <p className="text-sm text-gray-600 mb-3">{file.purpose}</p>
                        
                        <div className="bg-yellow-50 p-3 rounded text-xs">
                          <strong>To replace:</strong> Upload your new image to 
                          <code className="mx-1 bg-white px-1 rounded">/client/public/images/</code>
                          with filename <code className="bg-white px-1 rounded">{file.name}</code>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    File Path Reference
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    All images are stored in: <code className="bg-white px-2 py-1 rounded">/client/public/images/</code>
                  </p>
                  <p className="text-sm text-gray-600">
                    Simply replace any file in this folder with your new image using the same filename.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    Quick Content Editing
                  </CardTitle>
                  <CardDescription>
                    Edit content directly on your website pages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Step-by-step:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Visit any page of your website</li>
                      <li>Click the "Edit Mode" button in the navigation</li>
                      <li>Click directly on any text to edit it</li>
                      <li>Make your changes and press Enter to save</li>
                      <li>Click "Exit Edit Mode" when finished</li>
                    </ol>
                  </div>
                  
                  <Button asChild className="w-full">
                    <a href="/?edit=true" target="_blank">
                      Try Quick Editing Now
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Advanced Content Management
                  </CardTitle>
                  <CardDescription>
                    Full control over all website content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Features include:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Manage all pages and sections</li>
                      <li>Add new content blocks</li>
                      <li>Organize content by categories</li>
                      <li>Preview changes before publishing</li>
                      <li>Search and filter content</li>
                    </ul>
                  </div>
                  
                  <Button asChild variant="outline" className="w-full">
                    <a href="/cms-admin">
                      Open CMS Dashboard
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Content Types You Can Edit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { type: "Headings", desc: "Page titles and section headers" },
                    { type: "Paragraphs", desc: "Body text and descriptions" },
                    { type: "Buttons", desc: "Call-to-action button text" },
                    { type: "Images", desc: "Photos and graphics" }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-sm">{item.type}</h5>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Your Wayfarer Footprints website is ready for you to manage!
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <a href="/">View Your Website</a>
            </Button>
            <Button asChild>
              <a href="/?edit=true" target="_blank">Start Editing Content</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
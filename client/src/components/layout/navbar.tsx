import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { EditModeToggle } from "@/components/EditModeToggle";
import { logo } from "@/lib/images";

const CONTINENT_LINKS = [
  { href: "/destinations/asia", label: "Asia" },
  { href: "/destinations/africa", label: "Africa" },
  { href: "/destinations/europe", label: "Europe" },
  { href: "/destinations/north-america", label: "North America" },
  { href: "/destinations/south-america", label: "South America" },
  { href: "/destinations/oceania", label: "Australia & Oceania" },
  { href: "/destinations/antarctica", label: "Antarctica" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [destOpen, setDestOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/book", label: "My Book" },
    { href: "/consultation", label: "Tailor-Made Trips" },
    { href: "/marketing-services", label: "Partnerships" },
    { href: "/content-creation", label: "Marketing Services" },
  ];

  const isActive = (path: string) => location === path;

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm">
              <img
                src={logo}
                alt="Wayfarer Footprints Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">WAYFARER FOOTPRINTS</span>
          </a>
          
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-primary transition-colors text-sm ${
                  isActive(item.href) ? "text-primary font-medium" : ""
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Destinations dropdown */}
            <div ref={destRef} className="relative">
              <button
                onClick={() => setDestOpen((o) => !o)}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  location.startsWith("/destinations")
                    ? "text-primary font-medium"
                    : "text-gray-700 hover:text-primary"
                }`}
                aria-expanded={destOpen}
                aria-haspopup="true"
              >
                Destinations
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${destOpen ? "rotate-180" : ""}`}
                />
              </button>
              {destOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                  <a
                    href="/destinations"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium border-b border-gray-100"
                  >
                    All Destinations
                  </a>
                  {CONTINENT_LINKS.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary"
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-1">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-44 h-8 text-sm"
                  onBlur={() => {
                    if (!searchQuery) setSearchOpen(false);
                  }}
                />
                <Button type="submit" variant="ghost" size="sm" className="p-2">
                  <Search className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="p-1" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                  <X className="h-3 w-3" />
                </Button>
              </form>
            ) : (
              <Button variant="ghost" size="sm" className="p-2" onClick={() => setSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
            )}

            <EditModeToggle />
            <Button asChild size="sm">
              <a href="/contact">Contact</a>
            </Button>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8 h-full overflow-y-auto pb-8">
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-9 text-sm"
                  />
                  <Button type="submit" size="sm" className="px-3">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium transition-colors ${
                      isActive(item.href) ? "text-primary" : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Mobile Destinations expandable */}
                <div>
                  <button
                    className={`flex items-center gap-1 text-lg font-medium transition-colors w-full text-left ${
                      location.startsWith("/destinations") ? "text-primary" : "text-gray-700 hover:text-primary"
                    }`}
                    onClick={() => setMobileDestOpen((o) => !o)}
                  >
                    Destinations
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${mobileDestOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileDestOpen && (
                    <div className="mt-2 ml-4 flex flex-col gap-2">
                      <a
                        href="/destinations"
                        className="text-base text-gray-600 hover:text-primary font-medium"
                      >
                        All Destinations
                      </a>
                      {CONTINENT_LINKS.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          className="text-base text-gray-600 hover:text-primary"
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <Button asChild className="w-full mt-2">
                  <a href="/contact">Contact</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

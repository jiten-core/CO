"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { sections } from "@/lib/co-data"
import {
  Sun,
  Moon,
  Menu,
  Search,
  BookOpen,
  FlaskConical,
  Factory,
  HeartPulse,
  Thermometer,
  GitCompare,
  Moon as MoonIcon,
  Eye,
  Brain,
  Clock,
  Stethoscope,
  Syringe,
  Shield,
  Scale,
  FileText,
  BookMarked,
  HelpCircle,
  ChevronDown,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  FlaskConical,
  Factory,
  HeartPulse,
  Thermometer,
  GitCompare,
  MoonIcon,
  Eye,
  Brain,
  Clock,
  Stethoscope,
  Syringe,
  Shield,
  Scale,
  FileText,
  BookMarked,
  HelpCircle,
}

function SidebarNav({
  activeId,
  onNavigate,
  onNavigateMobile,
}: {
  activeId: string
  onNavigate: (id: string) => void
  onNavigateMobile?: (id: string) => void
}) {
  return (
    <nav className="flex flex-col gap-1 px-3 py-2" role="navigation" aria-label="Report sections">
      {sections.map((section) => {
        const Icon = iconMap[section.icon]
        const isActive = activeId === section.id

        return (
          <Tooltip key={section.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  onNavigate(section.id)
                  onNavigateMobile?.(section.id)
                }}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors text-left ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {Icon && <Icon className="size-4 shrink-0" />}
                <span className="truncate">{section.title}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              <p>{section.title}</p>
            </TooltipContent>
          </Tooltip>
        )
      })}
    </nav>
  )
}

function useIsMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  return mounted
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useIsMounted()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
          disabled={!mounted}
        >
          {mounted && theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  )
}

function CollapsibleSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!query.trim()) return

      const match = sections.find((s) =>
        s.title.toLowerCase().includes(query.toLowerCase())
      )
      if (match) {
        const el = document.getElementById(match.id)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        setQuery("")
        setOpen(false)
      }
    },
    [query]
  )

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 px-3 text-muted-foreground hover:text-foreground"
        >
          <Search className="size-4" />
          <span className="text-sm">Search sections…</span>
          <ChevronDown
            className="ml-auto size-4 transition-transform duration-200"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-2">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Type to filter…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            aria-label="Search sections"
          />
        </form>
        {query.trim() && (
          <div className="mt-1.5 max-h-40 overflow-y-auto">
            {sections
              .filter((s) =>
                s.title.toLowerCase().includes(query.toLowerCase())
              )
              .map((s) => {
                const Icon = iconMap[s.icon]
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      const el = document.getElementById(s.id)
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
                      setQuery("")
                      setOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                  >
                    {Icon && <Icon className="size-3.5 shrink-0" />}
                    <span className="truncate">{s.title}</span>
                  </button>
                )
              })}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function CoSidebar() {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "introduction")
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigateToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const navigateMobile = useCallback((id: string) => {
    navigateToSection(id)
    setMobileOpen(false)
  }, [navigateToSection])

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible.length > 0) {
        setActiveId(visible[0].target.id)
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })

    // Small delay to ensure DOM sections exist
    const timer = setTimeout(() => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id)
        if (el && observerRef.current) {
          observerRef.current.observe(el)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-card"
        aria-label="Sidebar navigation"
      >
        {/* Logo / Title */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              CO
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Carbon Monoxide
            </span>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <SidebarNav
            activeId={activeId}
            onNavigate={navigateToSection}
          />
        </ScrollArea>

        {/* Bottom section */}
        <div className="border-t border-border p-3 space-y-1">
          <CollapsibleSearch />
          <div className="flex items-center justify-between px-1 pt-1">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile FAB trigger */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="size-12 rounded-full shadow-lg"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b border-border px-6 py-4">
              <SheetTitle className="flex items-center gap-3">
                <span className="text-xl font-bold tracking-tight">CO</span>
              </SheetTitle>
              <SheetDescription>
                Carbon Monoxide — Scientific Report
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="flex-1 h-[calc(100vh-10rem)]">
              <SidebarNav
                activeId={activeId}
                onNavigate={navigateToSection}
                onNavigateMobile={navigateMobile}
              />
            </ScrollArea>
            <div className="border-t border-border p-4 space-y-2">
              <CollapsibleSearch />
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
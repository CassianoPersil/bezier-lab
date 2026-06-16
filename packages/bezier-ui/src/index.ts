// =============================================================================
// BÉZIER UI — Main Package Export
// Complete component library for Bézier Lab
// =============================================================================

// Logo
export { LogoImagotipo, LogoIsotipo } from './components/Logo'

// Primitives
export { Button, buttonVariants } from './components/Button'
export type { ButtonProps } from './components/Button'

export { Badge } from './components/Badge'
export type { BadgeProps } from './components/Badge'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/Card'
export type { CardProps } from './components/Card'

export { Input, Textarea } from './components/Input'
export type { InputProps, TextareaProps } from './components/Input'

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './components/Select'

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
  DialogTitle,
  DialogDescription,
} from './components/Dialog'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuShortcut,
} from './components/DropdownMenu'

export {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableTh,
  TableTd,
  TableEmpty,
  TableFooter,
} from './components/Table'
export type { SortDirection } from './components/Table'

export {
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  useSidebar,
} from './components/Sidebar'

export { Avatar, AvatarGroup } from './components/Avatar'
export type { AvatarProps, AvatarGroupProps } from './components/Avatar'

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsUnderlineList,
  TabsUnderlineTrigger,
} from './components/Tabs'

export { ToastProvider, useToast } from './components/Toast'
export type { ToastVariant } from './components/Toast'

export { Spinner, LoadingOverlay, Skeleton, SkeletonCard, SkeletonTableRow } from './components/Spinner'
export type { SpinnerProps } from './components/Spinner'

// Utilities
export { cn } from './lib/utils'

// Internationalization & Theme toggling
export { LanguageProvider, useLanguage } from './components/LanguageContext'
export type { Language } from './components/LanguageContext'
export { LanguageSelector } from './components/LanguageSelector'
export { ThemeToggle } from './components/ThemeToggle'

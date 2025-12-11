import { LucideIcon } from "lucide-react";
import {
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

export interface BreadcrumbsProps {
  currentPage: string;
  items: BreadcrumbsData[] | [];
}

export interface BreadcrumbsData {
  title: string;
  link: string;
}

export interface CollapsibleMenuProps {
  children: React.ReactNode;
  items: CollapsibleMenuData[] | [];
}

export interface CollapsibleMenuData {
  title: string;
  icon: LucideIcon;
  link: string;
}

export interface ProfileCardProps {
  variant?: "sidebar" | "medium" | "large";
  avatar: string;
  name: string;
  email: string;
}

export interface QuickNavigationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export interface DataCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  requiredLabel?: boolean;
  htmlFor: string;
  className?: string;
  errorMsg?: string | React.ReactElement | undefined;
}

export interface DatePickerProps {
  label: string;
  htmlFor: string;
  placeholder: string;
  requiredLabel?: boolean;
  value?: Date | undefined;
  onchange?: (date?: Date) => void;
}

export interface RadioOptionsProps {
  label: string;
  requiredLabel?: boolean;
  value?: "male" | "female" | string;
  onvaluechange?: (gender?: string) => void;
}

export interface FormComponentProps
  extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  asWrapper?: boolean;
  className?: string;
}

export interface FormHeaderProps extends HTMLAttributes<HTMLDivElement> {
  logo?: boolean;
  logoTitle?: string;
  className?: string;
  children: React.ReactNode;
}

export interface FormContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface FormFooterPops extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  button?: boolean;
}

export interface SidebarNavigationLinkProps {
  href: string;
  Icon?: LucideIcon;
  label: string;
  isActive?: boolean;
  onclick?: () => void;
  className?: string;
}

export interface CollapsibleSidebarNavigationProps {
  label: string;
  Icon: LucideIcon;
  sub: SidebarNavigationLinkProps[];
}

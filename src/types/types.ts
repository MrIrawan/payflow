import { LucideIcon } from "lucide-react";
import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

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
  errorMsg?: string | React.ReactElement | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export interface DatePickerProps {
  label: string;
  htmlFor: string;
  placeholder: string;
  requiredLabel?: boolean;
  value?: Date;
  onChange?: (date?: Date) => void;
  errorMessage?: string | React.ReactElement | FieldError;
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
  activeBg?: boolean;
}

export interface CollapsibleSidebarNavigationProps {
  label: string;
  Icon: LucideIcon;
  sub: SidebarNavigationLinkProps[];
}

export interface ButtonOptionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
  | "default"
  | "ghost"
  | "outline"
  | "destructive"
  | "secondary"
  | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  placeholder: string;
  Icon?: LucideIcon;
  align?: "start" | "end" | "center";
}

export interface DashboardBreadcrumbProps {
  data: {
    link?: {
      title: string;
      href: string;
    }[];
    page: string;
  }
}

export interface SelectGroupProps {
  label: string;
  htmlFor: string;
  placeholder: string;
  requiredLabel?: boolean;
  items: SelectGroupItemProps[];
  value?: string;
  onChange?: (val: string) => void;
  errorMessage?: string | React.ReactElement | FieldError;
}

export interface SelectGroupItemProps {
  value: string;
  displayText: string | number | React.ReactElement;
}


export interface UserLocation {
  longitude: number;
  latitude: number;
}

export interface ToasterVariants {
  background: string;
  backgroundIcon: string;
  icon: string;
  title: string;
}

export interface EmployeeDataCardData {
  currentSalary: string | number;
  countAttendance: string | number;
}
import { LucideIcon } from "lucide-react";
import { InputHTMLAttributes } from "react";

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

export interface DataCardProps {
  title: string;
  description: string;
  link: string;
  button: boolean;
  className?: string;
  titleStyle?: string;
  descriptionStyle?: string;
  buttonStyle?: string;
}

export interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
}

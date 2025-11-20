import { LucideIcon } from "lucide-react";
import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

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
  className?: string;
}

export interface DatePickerProps {
  label: string;
  htmlFor: string;
  placeholder: string;
  value?: Date | undefined;
  onchange?: (date?: Date) => void;
}

export interface SignUpData {
  first_name: string;
  last_name?: string;
  date_of_birth: Date;
  gender: "male" | "female";
  email_address: string;
  password_email: string;
}

export interface RadioOptionsProps {
  label: string;
  optionsNumber?: number | undefined;
}

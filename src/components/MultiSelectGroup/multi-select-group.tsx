"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────
import { MultiSelectGroupProps } from "@/types/types"

// ─── Component ────────────────────────────────────────────────────────────────

export const MultiSelectGroup = React.forwardRef<
    HTMLButtonElement,
    MultiSelectGroupProps
>(
    (
        {
            label,
            labelClassName,
            required = false,
            options,
            value = [],
            onChange,
            onBlur,
            name,
            disabled = false,
            placeholder = "Select options...",
            emptyMessage = "No items found.",
            className,
            error,
            maxSelect,
            searchable = true,
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false)

        // ── Handlers ──────────────────────────────────────────────────────────────

        const handleSelect = (selectedValue: string) => {
            const isSelected = value.includes(selectedValue)

            if (isSelected) {
                // Deselect
                onChange?.(value.filter((v) => v !== selectedValue))
            } else {
                // Cek maxSelect sebelum tambah
                if (maxSelect && value.length >= maxSelect) return
                onChange?.([...value, selectedValue])
            }
        }

        const handleRemoveChip = (
            e: React.MouseEvent,
            removedValue: string
        ) => {
            e.preventDefault()
            e.stopPropagation() // cegah Popover toggle saat klik X
            onChange?.(value.filter((v) => v !== removedValue))
        }

        const handleClearAll = (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            onChange?.([])
        }

        // ── Derived ───────────────────────────────────────────────────────────────

        const isMaxReached = maxSelect ? value.length >= maxSelect : false

        const selectedLabels = value.map((val) => {
            const matched = options.find((opt) => opt.value === val)
            return { value: val, label: matched?.label ?? val }
        })

        // ── Render ────────────────────────────────────────────────────────────────

        return (
            <div className={cn("flex flex-col gap-2", className)}>

                {/* Label */}
                <Label
                    htmlFor={name}
                    className={cn(
                        "text-sm font-medium text-foreground gap-1",
                        required &&
                        "after:content-['*'] after:text-destructive",
                        labelClassName
                    )}
                >
                    {label}
                </Label>

                {/*
          modal={true} → memberitahu Radix Popover bahwa
          dia berada di dalam Dialog/Modal, sehingga
          focus trap dan event handling tidak conflict
        */}
                <Popover open={open} onOpenChange={setOpen} modal={true}>

                    {/* Trigger — forwardRef ke button ini */}
                    <PopoverTrigger asChild>
                        <button
                            ref={ref}
                            id={name}
                            type="button"
                            role="combobox"
                            aria-expanded={open}
                            aria-haspopup="listbox"
                            aria-label={label}
                            disabled={disabled}
                            onBlur={onBlur}
                            className={cn(
                                // Base
                                "flex min-h-10 w-full items-center justify-between",
                                "rounded-md border border-input bg-background",
                                "px-3 py-2 text-sm",
                                "ring-offset-background transition-colors",
                                // Focus
                                "focus-visible:outline-none focus-visible:ring-2",
                                "focus-visible:ring-ring focus-visible:ring-offset-2",
                                // Hover
                                "hover:bg-accent hover:text-accent-foreground",
                                // Disabled
                                "disabled:cursor-not-allowed disabled:opacity-50",
                                // Error state
                                error &&
                                "border-destructive focus-visible:ring-destructive",
                            )}
                        >
                            {/* Chips area */}
                            <div className="flex flex-1 flex-wrap gap-1.5">
                                {selectedLabels.length > 0 ? (
                                    selectedLabels.map(({ value: val, label: lbl }) => (
                                        <Badge
                                            key={val}
                                            variant="secondary"
                                            className="flex items-center gap-1 px-2 py-0.5 text-xs font-normal"
                                        >
                                            {lbl}
                                            <X
                                                className="size-3 shrink-0 cursor-pointer opacity-60 hover:opacity-100 hover:text-destructive transition-opacity"
                                                onClick={(e) => handleRemoveChip(e, val)}
                                                aria-label={`Remove ${lbl}`}
                                            />
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground">{placeholder}</span>
                                )}
                            </div>

                            {/* Right side icons */}
                            <div className="ml-2 flex shrink-0 items-center gap-1">
                                {/* Clear all — muncul kalau ada pilihan */}
                                {selectedLabels.length > 0 && (
                                    <X
                                        className="size-4 opacity-50 hover:opacity-100 hover:text-destructive transition-opacity cursor-pointer"
                                        onClick={handleClearAll}
                                        aria-label="Clear all"
                                    />
                                )}
                                <ChevronsUpDown className="size-4 opacity-50" />
                            </div>
                        </button>
                    </PopoverTrigger>

                    {/* Dropdown content */}
                    <PopoverContent
                        className="w-[--radix-popover-trigger-width] p-0"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <Command>
                            {/* Search input — opsional */}
                            {searchable && (
                                <CommandInput placeholder="Search..." />
                            )}

                            <CommandList>
                                <CommandEmpty>{emptyMessage}</CommandEmpty>
                                <CommandGroup>
                                    {options.map((option) => {
                                        const isSelected = value.includes(option.value)
                                        const isDisabledByMax = isMaxReached && !isSelected

                                        return (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value}
                                                onSelect={handleSelect}
                                                disabled={isDisabledByMax}
                                                className={cn(
                                                    "cursor-pointer",
                                                    isDisabledByMax && "cursor-not-allowed opacity-40"
                                                )}
                                            >
                                                {/* Checkmark */}
                                                <div
                                                    className={cn(
                                                        "mr-2 flex size-4 items-center justify-center",
                                                        "rounded-sm border border-primary",
                                                        isSelected
                                                            ? "bg-primary text-primary-foreground"
                                                            : "opacity-50"
                                                    )}
                                                >
                                                    {isSelected && <Check className="size-3" />}
                                                </div>
                                                {option.label}
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </CommandList>

                            {/* Footer info kalau ada maxSelect */}
                            {maxSelect && (
                                <div className="border-t px-3 py-2">
                                    <p className="text-xs text-muted-foreground">
                                        {value.length} / {maxSelect} selected
                                    </p>
                                </div>
                            )}
                        </Command>
                    </PopoverContent>
                </Popover>

                {/* Error message */}
                {error && (
                    <p className="text-xs text-destructive" role="alert">
                        {error}
                    </p>
                )}

            </div>
        )
    }
)

MultiSelectGroup.displayName = "MultiSelectGroup"
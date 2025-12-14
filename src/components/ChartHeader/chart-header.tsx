"use client";

import { useState } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ChartHeader() {
  // monthState build with useState to catch month state
  const [monthState, setMonthState] = useState<string | null>(null);
  // yearState build with useState to catch year state
  const [yearState, setYearState] = useState<string | null>(null);

  return (
    <Card className="flex flex-row justify-between items-start px-6 py-0 border-none shadow-none">
      <CardHeader className="w-full flex flex-col gap-1 p-0 shadow-none">
        <CardTitle className="flex flex-row gap-1">
          Attendance graph -
          {/* if monthState and yearState is null, then select current attendance data */}
          {monthState === null && yearState === null ? (
            <p className="font-medium text-muted-foreground">current</p>
          ) : (
            <p className="font-medium text-muted-foreground">
              {/* if one of the states is null, then select the current attendance data. */}
              {monthState === null ? "current" : monthState.slice(0, 3)},{" "}
              {yearState === null ? "current" : yearState}
            </p>
          )}
        </CardTitle>
        <CardDescription>Based on Attendance data</CardDescription>
      </CardHeader>
      <div className="flex flex-row justify-between items-center gap-4">
        {/* month select component */}
        <Select onValueChange={(month) => setMonthState(month)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>years</SelectLabel>
              <SelectItem value="january" className="capitalize">
                january
              </SelectItem>
              <SelectItem value="fabruary" className="capitalize">
                February
              </SelectItem>
              <SelectItem value="march" className="capitalize">
                March
              </SelectItem>
              <SelectItem value="april" className="capitalize">
                April
              </SelectItem>
              <SelectItem value="may" className="capitalize">
                May
              </SelectItem>
              <SelectItem value="june" className="capitalize">
                June
              </SelectItem>
              <SelectItem value="july" className="capitalize">
                july
              </SelectItem>
              <SelectItem value="august" className="capitalize">
                august
              </SelectItem>
              <SelectItem value="september" className="capitalize">
                september
              </SelectItem>
              <SelectItem value="october" className="capitalize">
                october
              </SelectItem>
              <SelectItem value="november" className="capitalize">
                november
              </SelectItem>
              <SelectItem value="december" className="capitalize">
                december
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* year select component */}
        <Select onValueChange={(year) => setYearState(year)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              <SelectItem value="2025" className="capitalize">
                2025
              </SelectItem>
              <SelectItem value="2024" className="capitalize">
                2024
              </SelectItem>
              <SelectItem value="2023" className="capitalize">
                2023
              </SelectItem>
              <SelectItem value="2022" className="capitalize">
                2022
              </SelectItem>
              <SelectItem value="2021" className="capitalize">
                2021
              </SelectItem>
              <SelectItem value="2020" className="capitalize">
                2020
              </SelectItem>
              <SelectItem value="2019" className="capitalize">
                2019
              </SelectItem>
              <SelectItem value="2018" className="capitalize">
                2018
              </SelectItem>
              <SelectItem value="2017" className="capitalize">
                2017
              </SelectItem>
              <SelectItem value="2016" className="capitalize">
                2016
              </SelectItem>
              <SelectItem value="2015" className="capitalize">
                2015
              </SelectItem>
              <SelectItem value="2014" className="capitalize">
                2014
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}

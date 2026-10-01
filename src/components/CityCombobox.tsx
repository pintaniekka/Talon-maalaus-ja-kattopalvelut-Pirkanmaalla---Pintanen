import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { allCities } from "@/data/cityData";

// Pirkanmaa cities are already in cityData. Add Kanta-Häme cities not present there.
const EXTRA_KANTA_HAME = [
  "Riihimäki",
  "Janakkala",
  "Hattula",
  "Loppi",
  "Tammela",
  "Hausjärvi",
  "Humppila",
  "Jokioinen",
  "Ypäjä",
];

const ALL_CITY_NAMES = Array.from(
  new Set([...allCities.map((c) => c.name), ...EXTRA_KANTA_HAME])
).sort((a, b) => a.localeCompare(b, "fi"));

interface CityComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CityCombobox = ({ value, onChange, placeholder = "Valitse kunta..." }: CityComboboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className="flex w-full items-center justify-between py-3 px-4 rounded-xl border border-border bg-background text-foreground font-normal text-base outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        >
          {value || <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0 z-50 bg-popover"
        align="start"
        side="bottom"
        sideOffset={6}
        avoidCollisions={false}
      >
        <Command className="[&_[cmdk-input-wrapper]]:border-0">
          <CommandInput placeholder="Hae kuntaa..." aria-label="Hae kuntaa..." className="h-11 text-base outline-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0" />
          <CommandList>
            <CommandEmpty>Ei tuloksia.</CommandEmpty>
            <CommandGroup>
              {ALL_CITY_NAMES.map((city) => (
                <CommandItem
                  key={city}
                  value={city}
                  onSelect={(currentValue) => {
                    const match = ALL_CITY_NAMES.find(
                      (c) => c.toLowerCase() === currentValue.toLowerCase()
                    );
                    onChange(match || city);
                    setOpen(false);
                  }}
                  className="text-base"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === city ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CityCombobox;

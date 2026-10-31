import { useEffect, useState } from "react";
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

/**
 * Lista avataan kahdessa vaiheessa: ensin vain rivit, jotka mahtuvat näkyviin (300 px:n lista,
 * noin 7 riviä), ja loput seuraavassa ruudunpäivityksessä. Näin napautuksen ja listan
 * ilmestymisen väli lyhenee (INP) eikä ulkoasu muutu: loput rivit ovat vierityksen alapuolella.
 * Hintalaskurin paikkakuntavalitsimen avaus oli hitain vuorovaikutus (224–264 ms hidastetulla
 * suorittimella, 26.10.2026).
 */
const ENSIMMAINEN_ERA = 10;

interface CityComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Napin id, jotta lomake voi siirtää fokuksen tähän virheen kohdalla. */
  id?: string;
  /** Virheviestin id (KenttaVirhe); asettaa myös aria-invalid. */
  errorId?: string | null;
  ariaLabel?: string;
}

const CityCombobox = ({ value, onChange, placeholder = "Valitse kunta...", id, errorId, ariaLabel = "Paikkakunta" }: CityComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [kaikkiRivit, setKaikkiRivit] = useState(false);

  useEffect(() => {
    if (!open) {
      setKaikkiRivit(false);
      return;
    }
    // Kaksi ruudunpäivitystä: ensimmäinen piirtää listan alun, toinen lisää loput rivit.
    let toinen = 0;
    const ensimmainen = requestAnimationFrame(() => {
      toinen = requestAnimationFrame(() => setKaikkiRivit(true));
    });
    return () => {
      cancelAnimationFrame(ensimmainen);
      cancelAnimationFrame(toinen);
    };
  }, [open]);

  const nakyvat = kaikkiRivit ? ALL_CITY_NAMES : ALL_CITY_NAMES.slice(0, ENSIMMAINEN_ERA);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-label={value ? `${ariaLabel}: ${value}` : ariaLabel}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId ?? undefined}
          className="flex w-full items-center justify-between py-3 px-4 rounded-xl border border-border bg-background text-foreground font-normal text-base outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
              {nakyvat.map((city) => (
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

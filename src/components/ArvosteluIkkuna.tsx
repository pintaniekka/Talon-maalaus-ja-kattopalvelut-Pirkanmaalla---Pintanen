import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoogleIcon, Stars, getInitials } from "./TestimonialsMarquee";

/** Pitkän arvostelun koko teksti ikkunassa (TestimonialsMarquee.tsx lataa tämän laiskasti). */
const ArvosteluIkkuna = ({
  open,
  onOpenChange: setOpen,
  name,
  stars,
  text,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  stars: number;
  text: string;
}) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-lg rounded-3xl">
      <DialogHeader className="text-left">
        <DialogTitle className="flex items-center gap-3 font-heading">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary" aria-hidden="true">
            {getInitials(name)}
          </span>
          {name}
        </DialogTitle>
        <Stars stars={stars} />
      </DialogHeader>
      <DialogDescription className="text-[15px] leading-relaxed text-foreground">"{text}"</DialogDescription>
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <GoogleIcon />
          Google-arvostelu
        </span>
        <Link to="/kokemuksia/" className="font-semibold text-primary hover:underline">
          Kaikki arvostelut
        </Link>
      </div>
    </DialogContent>
  </Dialog>
);

export default ArvosteluIkkuna;

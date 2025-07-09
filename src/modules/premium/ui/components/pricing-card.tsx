import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleCheckIcon } from "lucide-react";

const pricingCardVariants = cva("rounded-lg p-4 py-6 w-full", {
  variants: {
    variant: {
      default: "bg-white text-black",
      highlighted: "bg-linear-to-br from-[#093C23] to-[#051B16] text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const pricingCardIconVariants = cva("size-5", {
  variants: {
    variant: {
      default: "fill-primary text-white",
      highlighted: "fill-white text-black",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const pricingCardSecondaryTextVariants = cva("text-neutral-700", {
  variants: {
    variant: {
      default: "text-neutral-700",
      highlighted: "text-neutral-300",
    },
  },
});

const pricingCardBadgeVariants = cva(
  "rounded-full px-2 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-neutral-200 text-neutral-800",
        highlighted: "bg-[#F5B797] text-[#4A2B0C]",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  }
);

export interface PricingCardProps
  extends VariantProps<typeof pricingCardVariants> {
  badge?: string | null;
  price: number;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onSubscribe: () => void;
}

export function PricingCard({
  badge,
  price,
  features,
  title,
  description,
  priceSuffix,
  className,
  buttonText,
  onSubscribe,
  variant = "default",
}: PricingCardProps) {
  return (
    <div className={cn(pricingCardVariants({ variant, className }))}>
      <div className="flex items-end gap-x-4 justify-between mb-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <h6 className="font-medium text-xl">{title}</h6>
            {badge && (
              <Badge className={cn(pricingCardBadgeVariants({ variant }))}>
                {badge}
              </Badge>
            )}
          </div>
          <p
            className={cn(
              "text-sm",
              pricingCardSecondaryTextVariants({ variant })
            )}
          >
            {description}
          </p>
        </div>
        <div className="flex items-end shrink-0 gap-x-0.5">
          <h4 className="text-3xl font-medium">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(Number(price))}
          </h4>
          <span className={cn(pricingCardSecondaryTextVariants({ variant }))}>
            {priceSuffix}
          </span>
        </div>
      </div>

      <div className="py-6">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>
      <Button
        className="w-full"
        size={"lg"}
        onClick={onSubscribe}
        variant={variant === "highlighted" ? "default" : "outline"}
      >
        {buttonText}
      </Button>
      <div className="mt-4 flex flex-col gap-y-2">
        <span className="text-xs font-semibold text-neutral-500">
          Features included
        </span>
        <ul
          className={cn(
            "flex flex-col gap-y-2",
            pricingCardSecondaryTextVariants({ variant })
          )}
        >
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-x-2">
              <CircleCheckIcon
                className={cn(pricingCardIconVariants({ variant }))}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

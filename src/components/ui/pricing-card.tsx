import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  pricePeriod: React.ReactNode;
  features: string[];
  buttonText: string;
  buttonLink: string;
  onButtonClick?: () => void;
  isHighlighted?: boolean;
  backgroundImage?: string;
  featuresFooter?: React.ReactNode;
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      title,
      description,
      price,
      oldPrice,
      discount,
      pricePeriod,
      features,
      buttonText,
      buttonLink,
      onButtonClick,
      isHighlighted = false,
      backgroundImage,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className="flex flex-col h-full relative overflow-hidden bg-card border-white/10"
        style={
          backgroundImage
            ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
            : undefined
        }
        {...props}
      >
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img src={backgroundImage} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader className="p-6">
            <CardTitle className="h2 mb-2">
              {title}
            </CardTitle>
            <CardDescription className="text-lg text-foreground max-w-[400px]">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-8">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="h1">{price}</span>
                {oldPrice && (
                  <span className="text-xl text-muted-foreground line-through">{oldPrice}</span>
                )}
                <span className="text-lg text-muted-foreground">
                  {pricePeriod}
                </span>
              </div>
              {discount && (
                <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-sm font-semibold text-primary">
                  {discount}
                </span>
              )}
            </div>

            <div className="h-px bg-white/10" />
            <div className="space-y-3">
              <h4 className="text-base font-medium text-foreground">
                Ce que tu obtiens
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="23"
                        height="23"
                        rx="11.5"
                        stroke="white"
                        strokeOpacity="0.1"
                      />
                      <path
                        d="M14.6673 10L11.0007 13.6667L9.33398 12"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm leading-snug text-white/80">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            {onButtonClick ? (
              <Button
                className={isHighlighted ? "w-full" : "w-full bg-primary/15 border-primary/50 text-primary-foreground hover:bg-primary hover:text-primary-foreground"}
                variant={isHighlighted ? "pricing" : "outline"}
                onClick={onButtonClick}
              >
                {buttonText}
              </Button>
            ) : (
              <Button
                className={isHighlighted ? "w-full" : "w-full bg-primary/15 border-primary/50 text-primary-foreground hover:bg-primary hover:text-primary-foreground"}
                variant={isHighlighted ? "pricing" : "outline"}
                asChild
              >
                <Link to={buttonLink}>
                  {buttonText}
                </Link>
              </Button>
            )}
          </CardFooter>
        </div>
      </Card>
    );
  }
);

PricingCard.displayName = "PricingCard";

export { PricingCard };


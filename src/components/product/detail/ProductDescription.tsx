import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div className="mb-16">
      <Accordion type="single" collapsible className="border rounded-lg">
        <AccordionItem value="description" className="border-none">
          <AccordionTrigger className="px-6 hover:no-underline">
            <span className="text-lg font-semibold">Description</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};


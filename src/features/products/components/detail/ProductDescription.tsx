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
    <div className="mt-6">
      <Accordion type="single" collapsible className="border border-white/10 rounded-xl bg-white/3">
        <AccordionItem value="description" className="border-none">
          <AccordionTrigger className="px-6 hover:no-underline text-white hover:text-[#DD2C6C]">
            <span className="text-lg font-semibold">Description</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <p className="text-sm text-white/55 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionTitle({ children, className }) {

    const { toggle } = useAccordionContext();
    const { id } = useAccordionItemContext();
    
    function handleClick() {
        toggle(id);
    }

    return (
        <h3 className={className} onClick={handleClick}>{children}</h3>
    );
}
// @mui
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
import { EventData } from 'src/@types/events';
// components
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

type Props = {
  faqs: EventData['faqs'];
};
export default function EventFaqsList({ faqs }: Props) {
  return (
    <div>
      {faqs &&
        faqs.map((faq) => (
          <Accordion key={faq.id}>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
              <Typography variant="subtitle1">{faq.heading}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>{faq.detail}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}

// @mui
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { IFaqs } from 'src/@types/faq';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance2 from 'src/utils/axios2';

// ----------------------------------------------------------------------

export default function FaqsList() {
  const [faqList, setFaqList] = useState<IFaqs[]>([]);

  const getFaqList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/faq_list/');
      setFaqList(response.data.FAQs);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getFaqList();
  }, [getFaqList]);

  return (
    <div>
      {faqList &&
        faqList.map((faq) => (
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

// @mui
import { Accordion, Typography, AccordionSummary, AccordionDetails, Box } from '@mui/material';
// _mock_
import {  _privacy } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function PrivacyFAQ() {
  return (
    <div>
      {_privacy.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {accordion.heading}{' '}
                </Typography>
              </Box>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{accordion.detailprivacy}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

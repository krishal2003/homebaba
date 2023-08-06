// @mui
import { Tabs, Tab, Grid } from '@mui/material';
// sections
import { useRouter } from 'next/router';
import Iconify from 'src/components/iconify/Iconify';
import { useState } from 'react';
import NewEditEventPage from 'src/sections/@dashboard/events/dashboard/edit';
import FAQListPage from 'src/sections/@dashboard/events/dashboard/event-faqs';
import EventSponsorsPage from 'src/sections/@dashboard/events/dashboard/event-sponsors';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function EventsTournaments() {
  const {
    query: { slug },
  } = useRouter();

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <NewEditEventPage />,
    },
    {
      value: 'faqs',
      label: 'Faqs',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <FAQListPage />,
    },
    {
      value: 'sponsors',
      label: 'Sponsors',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <EventSponsorsPage />,
    },
  ];

  const [currentTab, setCurrentTab] = useState('general');

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Tabs
          value={currentTab}
          orientation="vertical"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            '& .MuiTabs-scroller': {
              width: 1,
            },
            '& .MuiButtonBase-root': {
              width: 1,
              justifyContent: 'left',
            },
          }}
          onChange={(event, newValue) => setCurrentTab(newValue)}
        >
          {TABS.map((tab) => (
            <Tab
              sx={{ w: 1 }}
              key={tab.value}
              label={tab.label}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>
      </Grid>

      {TABS.map(
        (tab) =>
          tab.value === currentTab && (
            <Grid item xs={9} key={tab.value}>
              {tab.component}
            </Grid>
          )
      )}
    </Grid>
  );
}

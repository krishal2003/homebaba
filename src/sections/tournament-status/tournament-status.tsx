import React, { useState } from "react";
import Iconify from "src/components/iconify";
import { Tabs, Tab, Box } from "@mui/material";
import Live from "./live";
import Upcoming from "./upcoming";
import Past from "./past";

function TournamentStatus() {
 
  const [currentTab, setCurrentTab] = useState('live');

  const TABS = [
    {
      value: 'live',
      label: 'live',
      icon: <Iconify icon="ic:baseline-live-tv" />,
      component: <Live />,
    },
    {
      value: 'upcoming',
      label: 'upcoming',
      icon: <Iconify icon="material-symbols:event-upcoming-outline" />,
      component: <Upcoming />,
    },
    {
      value: 'past',
      label: 'past',
      icon: <Iconify icon="wpf:past" />,
      component: <Past />,
    },
  ];

  return (
    <>
      <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {TABS.map((tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>)}
    </>
  );
}

export default TournamentStatus;

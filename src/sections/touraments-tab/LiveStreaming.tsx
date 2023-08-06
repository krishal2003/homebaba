import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function LiveStreaming() {
  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h3" color="textPrimary" sx={{ textAlign: 'center' }}>
        To activate live streaming please log in first.
      </Typography>

<Box  sx={{ textAlign: 'center', pt:3 }}>

      <Button href="/auth/login/" variant="contained" >
        Log in
      </Button>
</Box>
    </Box>
  );
}

export default LiveStreaming;

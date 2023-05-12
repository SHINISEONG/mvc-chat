import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback, useState } from 'react';

const Community = () => {
  const [openCreateMeetingDialog, setOpenCreateMeetingDialog] = useState(false);
  const onOpenCreateMeeting = useCallback(() => {
    setOpenCreateMeetingDialog(true);
  }, []);
  const onCloseCreateMeeting = useCallback(() => {
    setOpenCreateMeetingDialog(false);
  }, []);
  const onSubmitCreateMeeting = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        userId: data.get('userId'),
        password: data.get('password'),
      });
    },
    []
  );
  return (
    <Box sx={{ marginTop: '64px' }}>
      <Button onClick={onOpenCreateMeeting}>모임 생성</Button>

      <Dialog open={openCreateMeetingDialog} onClose={onCloseCreateMeeting}>
        <Box component="form" onSubmit={onSubmitCreateMeeting}>
          <DialogTitle>모임 만들기</DialogTitle>

          <DialogContent>
            <DialogContentText>
              모임 이름과 모임 설명을 입력해주세요.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="meetingName"
              label="모임 이름을 정해주세요."
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="meetingIntro"
              label="모임 소개를 적어주세요."
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <Button type="submit">Subscribe</Button>
          <DialogActions>
            <Button onClick={onCloseCreateMeeting}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Button>모임 목록</Button>
    </Box>
  );
};

export default Community;

import { FormEvent, useCallback, FC, ChangeEvent, KeyboardEvent } from 'react';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

import LeftDrawer from '../LeftDrawer';
interface Props {
  chat: string;
  onSubmitForm: (e: FormEvent) => void;
  onChangeChat: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const ChatBox: FC<Props> = ({ chat, onSubmitForm, onChangeChat }) => {
  // const textareaRef: React.RefObject<HTMLDivElement> =
  //   useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (textareaRef.current) {
  //     autosize(textareaRef.current);
  //   }
  // }, []);
  const onKeydownChat = useCallback(
    (e: KeyboardEvent) => {
      console.log(e);
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm]
  );
  const onClickChat = useCallback(
    (e: FormEvent) => {
      console.log(e);

      e.preventDefault();
      onSubmitForm(e);
    },
    [onSubmitForm]
  );
  return (
    <Stack spacing={0} direction="row">
      <LeftDrawer />
      <TextField
        id="outlined-multiline-flexible"
        multiline
        autoFocus
        maxRows={4}
        fullWidth
        variant="filled"
        value={chat}
        onChange={onChangeChat}
        onKeyDown={onKeydownChat}

        //ref={textareaRef}
      />

      <Button variant="contained" onClick={onClickChat}>
        <SendIcon fontSize="large" />
      </Button>
    </Stack>
  );
};

export default ChatBox;

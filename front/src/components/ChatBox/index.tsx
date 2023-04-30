import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  FC,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import autosize from 'autosize';

interface Props {
  chat: string;
  onSubmitForm: (e: FormEvent) => void;
  onChangeChat: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const ChatBox: FC<Props> = ({
  chat,
  onSubmitForm,
  onChangeChat,
  placeholder,
}) => {
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

  return (
    <Stack spacing={0} direction="row">
      <TextField
        id="outlined-multiline-flexible"
        multiline
        autoFocus
        maxRows={4}
        fullWidth
        variant="standard"
        value={chat}
        onChange={onChangeChat}
        onKeyDown={onKeydownChat}
        //ref={textareaRef}
      />

      <Button>
        <SendIcon fontSize="large" />
      </Button>
    </Stack>
  );
};

export default ChatBox;

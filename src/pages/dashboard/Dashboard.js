import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { Brightness4, Brightness7, Home, Menu, Message } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideList from './SideList';
import Protected from '../../components/protected/Protected';
import Login from '../../components/user/Login';
import { useSelector } from 'react-redux'; // To check if the user is logged in

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);  // To open message box
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);  // List of messages between host and user
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.currentUser);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'dark' : 'light',
        },
      }),
    [dark]
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Handle opening of the message dialog
  const handleOpenMessageDialog = () => {
    setMessageDialogOpen(true);
  };

  // Handle closing of the message dialog
  const handleCloseMessageDialog = () => {
    setMessageDialogOpen(false);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: currentUser?.name, text: message },
    ]);
    setMessage('');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/')}>
                <Home />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton onClick={() => setDark(!dark)}>
              {dark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            {/* Message Button */}
            <Tooltip title="Messages">
              <IconButton sx={{ mr: 1 }} onClick={handleOpenMessageDialog}>
                <Message />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* Conditionally render based on user login */}
        <Protected>
          {currentUser ? (
            // Show SideList if the user is logged in
            <SideList {...{ open, setOpen }} />
          ) : (
            // Show Login form if the user is not logged in
            <Login />
          )}
        </Protected>
      </Box>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onClose={handleCloseMessageDialog}>
        <DialogContent>
          <Typography variant="h6">Messages</Typography>
          <Box sx={{ height: 300, overflowY: 'scroll', marginBottom: 2 }}>
            {/* Display the list of messages */}
            {messages.map((msg, index) => (
              <Box key={index} sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textPrimary">
                  <strong>{msg.sender}:</strong> {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            label="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessageDialog} color="primary">
            Close
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>

    </ThemeProvider>
  );
}

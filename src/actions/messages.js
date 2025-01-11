// actions/messages.js

export const sendMessage = (message) => {
    return {
      type: 'SEND_MESSAGE',
      payload: message,  // The message object should include sender, receiver, text, timestamp
    };
  };
  
  export const loadMessages = (messages) => {
    return {
      type: 'LOAD_MESSAGES',
      payload: messages,  // The list of messages (for example, from a database or server)
    };
  };
  
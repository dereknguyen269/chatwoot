import types from '../../../mutation-types';
import { mutations } from '../../conversations';

describe('#mutations', () => {
  describe('#EMPTY_ALL_CONVERSATION', () => {
    it('empty conversations', () => {
      const state = { allConversations: [{ id: 1 }], selectedChatId: 1 };
      mutations[types.EMPTY_ALL_CONVERSATION](state);
      expect(state.allConversations).toEqual([]);
      expect(state.selectedChatId).toEqual(null);
    });
  });

  describe('#MARK_MESSAGE_READ', () => {
    it('mark conversation as read', () => {
      const state = { allConversations: [{ id: 1 }] };
      const lastSeen = new Date().getTime() / 1000;
      mutations[types.MARK_MESSAGE_READ](state, { id: 1, lastSeen });
      expect(state.allConversations).toEqual([
        { id: 1, agent_last_seen_at: lastSeen },
      ]);
    });

    it('doesnot send any mutation if chat doesnot exist', () => {
      const state = { allConversations: [] };
      const lastSeen = new Date().getTime() / 1000;
      mutations[types.MARK_MESSAGE_READ](state, { id: 1, lastSeen });
      expect(state.allConversations).toEqual([]);
    });
  });

  describe('#CLEAR_CURRENT_CHAT_WINDOW', () => {
    it('clears current chat window', () => {
      const state = { selectedChatId: 1 };
      mutations[types.CLEAR_CURRENT_CHAT_WINDOW](state);
      expect(state.selectedChatId).toEqual(null);
    });
  });

  describe('#SET_CURRENT_CHAT_WINDOW', () => {
    it('set current chat window', () => {
      const state = { selectedChatId: 1 };
      mutations[types.SET_CURRENT_CHAT_WINDOW](state, { id: 2 });
      expect(state.selectedChatId).toEqual(2);
    });

    it('does not set current chat window', () => {
      const state = { selectedChatId: 1 };
      mutations[types.SET_CURRENT_CHAT_WINDOW](state);
      expect(state.selectedChatId).toEqual(1);
    });
  });

  describe('#SET_CONVERSATION_CAN_REPLY', () => {
    it('set canReply flag', () => {
      const state = { allConversations: [{ id: 1, can_reply: false }] };
      mutations[types.SET_CONVERSATION_CAN_REPLY](state, {
        conversationId: 1,
        canReply: true,
      });
      expect(state.allConversations[0].can_reply).toEqual(true);
    });
  });
});

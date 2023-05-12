import { create } from 'zustand';

type State = {
  jSessionId: string;
};

type Action = {
  setJSessionId: (jSessionId: State['jSessionId']) => void;
};
const useJSessionStore = create<State & Action>((set) => ({
  jSessionId: '',
  setJSessionId: (jSessionId: string) =>
    set(() => ({ jSessionId: jSessionId })),
}));

export default useJSessionStore;

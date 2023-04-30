import { create } from 'zustand';

type State = {
  springSvrIp: string;
  expressSvrIp: string;
};

const useIpStore = create<State>(() => ({
  springSvrIp: import.meta.env.VITE_SPRING_SVR_URL,
  expressSvrIp: import.meta.env.VITE_EXPRESS_SVR_URL,
}));

export default useIpStore;

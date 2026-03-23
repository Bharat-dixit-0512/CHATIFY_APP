import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API_URL = rawApiUrl.replace(/\/+$/, "").endsWith("/api")
  ? rawApiUrl.replace(/\/+$/, "")
  : `${rawApiUrl.replace(/\/+$/, "")}/api`;
const SOCKET_URL = API_URL.replace(/\/api\/?$/, "");

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallbackMessage;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  socket: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in AuthCheck:", error);
      set({ authUser: null });
      get().disconnectSocket();
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      get().connectSocket();

      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(getErrorMessage(error, "Signup failed"));
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      get().connectSocket();

      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed"));
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null, onlineUsers: [] });
      toast.success("Logout successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error: ", error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set((state) => ({
        authUser: state.authUser ? { ...state.authUser, profilePic: res.data.profilePic } : res.data,
      }));
      toast.success("Profile picture updated");
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update profile"));
      return false;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket) return;

    const socketInstance = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socketInstance.on("connect", () => {
      set({ socket: socketInstance });
    });

    socketInstance.on("getOnlineUsers", (onlineUsers) => {
      set({ onlineUsers });
    });

    socketInstance.on("disconnect", () => {
      set({ onlineUsers: [] });
    });

    socketInstance.on("connect_error", (error) => {
      console.log("Socket connection error:", error.message);
    });

    set({ socket: socketInstance });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
    }
    set({ socket: null, onlineUsers: [] });
  },

}));

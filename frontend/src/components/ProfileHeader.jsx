import { useState, useRef } from "react";
import {
  KeyRoundIcon,
  LogOutIcon,
  VolumeOffIcon,
  Volume2Icon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const {
    logout,
    authUser,
    updateProfile,
    isUpdatingProfile,
    changePassword,
    isChangingPassword,
  } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [showPasswordPanel, setShowPasswordPanel] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("Please select an image smaller than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      const success = await updateProfile({ profilePic: base64Image });
      if (!success) {
        setSelectedImg(null);
      }
    };
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const success = await changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });

    if (success) {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordPanel(false);
    }
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group cursor-pointer disabled:cursor-not-allowed"
              onClick={() => fileInputRef.current.click()}
              disabled={isUpdatingProfile}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>

            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            onClick={() => setShowPasswordPanel((prev) => !prev)}
          >
            <KeyRoundIcon className="size-5" />
          </button>

          {/* LOGOUT BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* SOUND TOGGLE BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>

      {showPasswordPanel && (
        <form onSubmit={handleChangePassword} className="mt-5 space-y-3">
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
              }
              placeholder="Current password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 pr-11 text-sm text-slate-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              {showCurrentPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
              }
              placeholder="New password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 pr-11 text-sm text-slate-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              {showNewPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </button>
          </div>

          <input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            placeholder="Confirm new password"
            className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm text-slate-200"
            required
          />

          <button
            type="submit"
            disabled={isChangingPassword}
            className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isChangingPassword ? "Updating..." : "Change password"}
          </button>
        </form>
      )}
    </div>
  );
}
export default ProfileHeader;

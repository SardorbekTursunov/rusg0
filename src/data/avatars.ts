/** Avatara presetlari — foydalanuvchi 12 ta emoji avataridan birini tanlaydi */
export interface AvatarPreset {
  id: string;
  emoji: string;
  label: string;
  bg: string;
}

export const avatars: AvatarPreset[] = [
  { id: "av1", emoji: "🦊", label: "Tulki", bg: "#FFF0E3" },
  { id: "av2", emoji: "🐯", label: "Yo'lbars", bg: "#FFF4D6" },
  { id: "av3", emoji: "🐼", label: "Panda", bg: "#EDF2F7" },
  { id: "av4", emoji: "🐸", label: "Baqa", bg: "#E6F8E3" },
  { id: "av5", emoji: "🦁", label: "Sher", bg: "#FFF6DE" },
  { id: "av6", emoji: "🦉", label: "Boyqush", bg: "#F0EBFF" },
  { id: "av7", emoji: "🐧", label: "Penguin", bg: "#E4F4FF" },
  { id: "av8", emoji: "🐨", label: "Koala", bg: "#FDEEF3" },
  { id: "av9", emoji: "🦄", label: "Yakson", bg: "#F3E9FF" },
  { id: "av10", emoji: "🐳", label: "Kit", bg: "#E3F7FF" },
  { id: "av11", emoji: "🐢", label: "Toshbaqa", bg: "#EBF7E0" },
  { id: "av12", emoji: "🚀", label: "Raketa", bg: "#FFECEF" },
];

export function getAvatar(id: string): AvatarPreset {
  return avatars.find((a) => a.id === id) ?? avatars[0];
}

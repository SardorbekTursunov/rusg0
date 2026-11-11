/** DEMO rejimdagi namuna foydalanuvchilar (reyting jonlantirish uchun) */
export interface DemoUserSeed {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatarId: string;
  /** Joriy haftada to'plangan XP */
  weeklyXp: number;
  /** Umumiy XP */
  totalXp: number;
  currentStreak: number;
}

export const demoUsers: DemoUserSeed[] = [
  {
    id: "demo_aziza",
    username: "aziza_k",
    fullName: "Aziza Karimova",
    email: "aziza@demo.rusgo",
    avatarId: "av2",
    weeklyXp: 460,
    totalXp: 1820,
    currentStreak: 12,
  },
  {
    id: "demo_jasur",
    username: "jasur_dev",
    fullName: "Jasur Ergashev",
    email: "jasur@demo.rusgo",
    avatarId: "av1",
    weeklyXp: 385,
    totalXp: 940,
    currentStreak: 6,
  },
  {
    id: "demo_malika",
    username: "malika_8",
    fullName: "Malika Tursunova",
    email: "malika@demo.rusgo",
    avatarId: "av9",
    weeklyXp: 320,
    totalXp: 1275,
    currentStreak: 9,
  },
  {
    id: "demo_shahzod",
    username: "shahzod_uz",
    fullName: "Shahzod Nazarov",
    email: "shahzod@demo.rusgo",
    avatarId: "av5",
    weeklyXp: 240,
    totalXp: 610,
    currentStreak: 3,
  },
  {
    id: "demo_dilnoza",
    username: "dilnoza_a",
    fullName: "Dilnoza Abdullayeva",
    email: "dilnoza@demo.rusgo",
    avatarId: "av4",
    weeklyXp: 185,
    totalXp: 430,
    currentStreak: 4,
  },
  {
    id: "demo_bekzod",
    username: "bekzod_t",
    fullName: "Bekzod To'rayev",
    email: "bekzod@demo.rusgo",
    avatarId: "av7",
    weeklyXp: 120,
    totalXp: 265,
    currentStreak: 2,
  },
  {
    id: "demo_nilufar",
    username: "nilufar_s",
    fullName: "Nilufar Sodiqova",
    email: "nilufar@demo.rusgo",
    avatarId: "av6",
    weeklyXp: 75,
    totalXp: 95,
    currentStreak: 1,
  },
];

/** Demo rejimdagi boshlang'ich hisob (ro'yxatdan o'tgan foydalanuvchi uchun namuna) */
export const DEMO_ADMIN = {
  id: "demo_admin",
  username: "admin",
  fullName: "RusGo admin",
  email: "admin@rusgo.uz",
  password: "admin1234",
};

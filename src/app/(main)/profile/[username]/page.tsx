import Profile from "@/features/profile/components/Profile";

export default async function UserProfilePage({ params }: any) {
  // WAJIB AWAIT di Next.js 15+
  const resolvedParams = await params;
  const { username } = resolvedParams;

  // Pastikan dikirim ke sini
  return <Profile username={username} />;
}

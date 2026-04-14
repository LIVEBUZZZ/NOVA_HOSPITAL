import { getCurrentUser } from "@/lib/auth";
import { getAppData, updateDoctorProfile } from "@/lib/server/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DoctorProfilePage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "doctor") {
    redirect("/auth/login?role=doctor");
  }

  const appData = await getAppData();
  const doctor = appData.users.find(u => u.id === user.id && u.role === "doctor");

  if (!doctor) {
    return <p className="text-destructive">Doctor profile not found.</p>;
  }

  async function handleUpdateProfile(formData: FormData) {
    "use server";
    const specialty = formData.get("specialty") as string;
    const bio = formData.get("bio") as string;
    const profileImageUrl = formData.get("profileImageUrl") as string;
    const availability = formData.get("availability") as string;

    await updateDoctorProfile(user!.id, {
      specialty,
      bio,
      profileImageUrl,
      availability
    });

    revalidatePath("/dashboard/doctor/profile");
    revalidatePath("/doctors"); // Assuming a public doctors page
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-foreground">Edit Your Profile</h1>
      <p className="text-muted-foreground">Update your public profile information that visitors see.</p>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleUpdateProfile} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={doctor.fullName} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={doctor.email} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input id="specialty" name="specialty" defaultValue={doctor.specialty} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" defaultValue={doctor.bio} rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profileImageUrl">Profile Image URL</Label>
              <Input id="profileImageUrl" name="profileImageUrl" defaultValue={doctor.profileImageUrl} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="availability">Availability</Label>
              <Input id="availability" name="availability" defaultValue={doctor.availability} />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
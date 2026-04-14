import { NotificationList } from "@/components/portal/notification-list";
import { getCurrentUser } from "@/lib/auth";
import { getPatientNotifications } from "@/lib/server/store";

export default async function PatientNotificationsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "patient") {
    return null;
  }

  const notifications = await getPatientNotifications(user.id);
  return <NotificationList items={notifications} />;
}

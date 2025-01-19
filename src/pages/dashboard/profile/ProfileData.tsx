import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { useGetProfile } from "@/features/api/profile/profile.api";

export function ProfileData() {
  const { data, isLoading, error } = useGetProfile();

  if (isLoading) return <div className="animate-pulse">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading profile</div>;
  if (!data) return null;

  return (
    <div className="col-span-2 bg-white  rounded-lg">
      <section className="mb-6">
        <div className="flex gap-4 items-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-blue-400 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">
              {data.user.name}
            </h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Mail className="w-4 h-4" />
              <span>{data.user.email}</span>
            </div>
          </div>
        </div>
        <div className="inline-flex px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
          {data.gender === "LAKILAKI" ? "Male" : "Female"}
        </div>
      </section>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <Phone className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-900">{data.phoneNumber}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Birth Date</p>
            <p className="text-gray-900">
              {new Date(data.birthDate).toLocaleDateString()} ({data.age} years)
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Birth Place</p>
            <p className="text-gray-900 capitalize">{data.birthPlace}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileData;

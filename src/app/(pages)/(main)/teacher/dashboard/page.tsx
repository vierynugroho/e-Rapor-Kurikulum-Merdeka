'use client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDashboardData } from '@/services/pages/dashboard';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Users, BookOpen, Calendar, School } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function TeacherDashboardPage() {
    const { data: session, status } = useSession();
    const { data, isLoading, error } = useQuery({
        queryFn: getDashboardData,
        queryKey: ['dashboardData', session?.user.id],
        enabled: !!session?.user.id,
    });
    console.log(data);

    if (isLoading || status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="m-4">
                <AlertDescription>
                    Failed to load student attendances: {error.message}
                </AlertDescription>
            </Alert>
        );
    }

    const stats = [
        {
            title: 'Kelas Anda',
            value: data?.userData?.Class.name,
            icon: School,
            description: 'Kelas yang Anda ampu',
        },
        {
            title: 'Total Peserta Didik',
            value: data?.totalStudent,
            icon: Users,
            description: 'Jumlah siswa aktif',
        },
        {
            title: 'Periode Aktif',
            value: `${data?.activePeriod.semester} ${data?.activePeriod.year}`,
            icon: Calendar,
            description: 'Semester berjalan',
        },
    ];

    const activityStats = [
        {
            label: 'Penilaian',
            value: data?.userData?._count.Score,
        },
        {
            label: 'Perkembangan',
            value: data?.userData?._count.Development,
        },
        {
            label: 'Refleksi',
            value: data?.userData?._count.Reflection,
        },
        {
            label: 'Kehadiran',
            value: data?.userData?._count.Attendance,
        },
    ];

    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600">
                <CardContent className="p-6">
                    <div className="text-white">
                        <h2 className="text-2xl font-bold">
                            Selamat Datang, {data?.userData?.fullname}! 👋
                        </h2>
                        <p className="mt-2 opacity-90">
                            {data?.userData?.role == 'TEACHER'
                                ? 'Guru'
                                : 'Admin'}{' '}
                            di {data?.userData?.Class.name}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className="transition-shadow hover:shadow-lg"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </p>
                                    <h3 className="mt-2 text-2xl font-bold">
                                        {stat.value}
                                    </h3>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </div>
                                <stat.icon className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Activity Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Ringkasan Aktivitas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {activityStats.map((activity, index) => (
                            <div
                                key={index}
                                className="rounded-lg bg-muted/50 p-4 text-center"
                            >
                                <h4 className="text-2xl font-bold">
                                    {activity.value}
                                </h4>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {activity.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

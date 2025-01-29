export default function TeacherDashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="h-full min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <h1 className="flex h-full w-full items-center justify-center p-3 text-center text-lg font-semibold">
                    😎
                    <br /> Welcome, Guru! <br /> Semangatt!
                </h1>
            </div>
        </div>
    );
}

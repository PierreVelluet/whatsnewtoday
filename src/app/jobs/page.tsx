import JobsSection from "@/sections/Jobs/JobsSection";

export default async function Games() {
    const list: string[] = ["gggg", "faster than light"];

    return (
        <div className="container mx-auto flex flex-col justify-center">
            <JobsSection list={list} />
        </div>
    );
}

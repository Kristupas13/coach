import { PratimaSection } from "@/components/pratimai-section"
import { getExercises } from "@/lib/exercises-data"

export default async function HomePage() {
    const exercises = await getExercises()

    return (
        <PratimaSection exercises={exercises} />
    )
}
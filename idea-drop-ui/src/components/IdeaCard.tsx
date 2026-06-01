import { Link } from "@tanstack/react-router"

import type { Idea } from "@/types"

type IdeaCardProps = {
  idea: Idea
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  return (
    <li className="border border-gray-300 p-4 rounded grid">
      <div>
        <h2 className="text-lg font-semibold _clr-main">{idea.title}</h2>
        <p className="text-gray-400 mt-2">{idea.summary}</p>
      </div>
      <Link
        to="/ideas/$ideaId"
        params={{ ideaId: idea.id.toString() }}
        className="text-blue-400 mt-2 underline hover:text-blue-600"
      >
         Read More
      </Link>
    </li>
  )
}

export default IdeaCard

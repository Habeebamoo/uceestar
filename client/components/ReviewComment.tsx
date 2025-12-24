import { Review } from "@/types/review"

const ReviewComment = ({ review }: { review: Review } ) => {
  return (
    <div className="flex-start gap-4 items-start">
      <div className="h-12 w-12 bg-gray-100 rounded-full border-1 border-gray-200 flex-none"></div>
      <div>
        <h1 className="font-outfit">{review.name}</h1>
        <p className="text-gray-800 font-jsans-light text-sm mt-1">{review.comment}</p>

        <div>

        </div>
      </div>
    </div>
  )
}

export default ReviewComment
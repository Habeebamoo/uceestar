

const Category = () => {
  return (
    <section className="px-4 md:mt-6 md:px-10 lg:px-20">
      <h1 className="font-outfit mt-12 lg:mt-15 text-xl md:text-2xl lg:text-3xl text-center">Categories</h1>

      <div className="overflow-x-auto flex-center whitespace-nowrap mt-12 pb-8 gap-8 sm:gap-10 md:gap-20">

        <div className="bg-gray-200 shrink-0 h-25 w-25 rounded-full flex-center">
          <img src="/sneakers-icon.png" className="h-10 md:h-12" />
        </div>

        <div className="bg-gray-200 shrink-0 h-25 w-25 rounded-full flex-center">
          <img src="/iphone-icon.png" className="h-10 md:h-12" />
        </div>

        <div className="bg-gray-200 shrink-0 h-25 w-25 rounded-full flex-center">
          <img src="/laptop-icon.png" className="h-10 md:h-12" />
        </div>

         <div className="bg-gray-200 shrink-0 h-25 w-25 rounded-full flex-center">
          <img src="/watch-icon.png" className="h-10 md:h-12" />
        </div>

      </div>
    </section>
  )
}

export default Category
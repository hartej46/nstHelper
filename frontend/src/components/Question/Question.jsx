function Question({ question, title, loading }) {
  return (
    <section className="w-[380px] min-w-[340px] h-full bg-[#0d1117] text-gray-200 p-5 flex flex-col overflow-y-auto border-r border-gray-800 font-sans select-none scrollbar-thin">
      {loading && (
        <div role="status" className="animate-pulse space-y-6">
          <div className="h-7 bg-gray-800 rounded w-3/4 my-2"></div>
          <hr className="border-gray-800" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      
      {!loading && (
        <div className="space-y-5 flex-1">
          <div>
            <h1 className="text-lg font-bold text-gray-100 tracking-tight">
              {title || "Untitled Question"}
            </h1>
          </div>

          <hr className="border-gray-800/60" />

          <div className="text-[13px] leading-relaxed text-gray-300 font-normal space-y-4 overflow-x-hidden">
            {question ? (
              <div className="whitespace-pre-wrap">{question}</div>
            ) : (
              <div className="text-gray-500 text-center py-6">No problem details found.</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Question;
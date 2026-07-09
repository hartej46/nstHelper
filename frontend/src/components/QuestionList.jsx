import { Link } from "react-router-dom";

function QuestionList({ questions }) {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-3 bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Problem Statements
        
      </div>

      <div className="divide-y divide-gray-100">
        {questions && questions.map((question) => (
          <div 
            key={question.urlId}
            className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors group"
          >
            <Link 
              to={`../playground/code/${question.urlId}`}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer flex-1"
            >
              
              {question.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
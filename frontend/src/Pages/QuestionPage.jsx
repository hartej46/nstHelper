import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuestionList from '../components/QuestionList';
import Search from '../components/searchbar/Search';
import { getQuestionsApi } from '../service/service';

function QuestionPage() {
    const [searchParams] = useSearchParams();
    const currentSubject = searchParams.get('subject') || 'psp';

    const [search, setSearch] = useState('');
    const [questions, setQuestions] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const observer = useRef();

    const fetchMoreQuestions = async () => {
        if (loading || !nextCursor) return;
        setLoading(true);
        try {
            const res = await getQuestionsApi(currentSubject, search, nextCursor);
            setQuestions(prev => [...prev, ...(res.data || [])]);
            setNextCursor(res.pagination?.nextCursor || null);
            setHasMore(res.pagination?.hasMore || false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    const lastQuestionRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMoreQuestions();
            }
        });
        
        if (node) observer.current.observe(node);
    }, [loading, hasMore, nextCursor]); 

    useEffect(() => {
        const initialFetch = async () => {
            setLoading(true);
            try {
                const res = await getQuestionsApi(currentSubject, search, null);
                
                setQuestions(res.data || []); 
                setNextCursor(res.pagination?.nextCursor || null);
                setHasMore(res.pagination?.hasMore || false);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        initialFetch();
    }, [currentSubject, search]); 

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold capitalize text-gray-800">{currentSubject} Problems</h1>
                <Search onDebounce={(value) => setSearch(value)} />
            </div>

            <QuestionList questions={questions} />

            <div ref={lastQuestionRef} className="h-10 w-full flex items-center justify-center text-sm text-gray-400">
                {loading && <p>Loading items...</p>}
                {!hasMore && questions.length > 0 && <p>You've viewed all questions</p>}
                {!loading && questions.length === 0 && <p>No questions found.</p>}
            </div>
        </div>
    );
}

export default QuestionPage;
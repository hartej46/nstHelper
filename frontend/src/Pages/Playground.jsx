import { useEffect, useState } from 'react';
import { Question, Code } from '../components/index';
import { questionDetail } from '../service/service';
import { useParams } from 'react-router-dom';

function Playground() {
    const [questions, setQuestion] = useState("Liund lele");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                setLoading(true);
                const data = await questionDetail({id});
                console.log(data.data[0])
                if (isMounted) {
                    setQuestion(data.data[0]);
                }
            } catch (error) {
                console.error("Error loading question:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [id]);

    return (
        <div className="flex h-screen w-full bg-[#0b0f19] overflow-hidden">
            <Question question={questions.question} title={questions.title} loading={loading} />
            
            <main className="flex-1 p-5 h-full min-w-0 bg-[#070a12]">
                <Code code={questions.code} language={questions.language} loading={loading} />
            </main>
        </div>
    );
}

export default Playground;
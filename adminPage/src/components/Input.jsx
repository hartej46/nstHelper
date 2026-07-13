import { useState } from "react"
import { addquestion } from '../service/service'
import './Input.css';

function Input() {
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [code, setCode] = useState('');
    const [question, setQuestion] = useState('');
    const [urlId, setUrlId] = useState("");
    const [subject, setSubject] = useState("");

    const handleTitle = (e) => {
      setTitle(e.target.value)
    }

    const handleLanguage = (e) => {
      setLanguage(e.target.value)
    }

    const handleSubject = (e) => {
      setSubject(e.target.value)
    }

    const handleQuestion = (e) => {
      setQuestion(e.target.value)
    }

    const handleCode = (e) => {
      setCode(e.target.value)
    }

    const handleUrlId = (e) => {
      setUrlId(e.target.value)
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addquestion({
          title: title,
          language: language,
          subject: subject,
          urlId: urlId,
          question: question,
          code: code
        })
      } catch (error) {
        console.error(error);
        throw "Somethiing went wrong"
      }
    }

  return (
    <div className="input-container">
      <form className="input-form" onSubmit={handleSubmit}>
        <input 
          type="text"
          name="title" 
          placeholder="title"
          value={title}
          onChange={handleTitle}
         />

         <input 
          type="text"
          name="language"
          placeholder="language" 
          value={language}
          onChange={handleLanguage}
         />

         <input 
          type="text"
          name="subject" 
          placeholder="subject"
          value={subject}
          onChange={handleSubject}
         />

         <input 
          type="text"
          name="urlId"
          placeholder="urlId"
          value={urlId}
          onChange={handleUrlId}
         />

         <input 
          type="text"
          name="question" 
          placeholder="question"
          value={question}
          onChange={handleQuestion}
         />

         <textarea
          name="code" 
          placeholder="code"
          value={code}
          onChange={handleCode}
         />

         <button type="submit">
            Submit
        </button>
      </form>
    </div>
  )
}

export default Input
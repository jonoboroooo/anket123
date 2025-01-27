import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CreateSurvey() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { id: uuidv4(), text: 'En sevdiğiniz film türü nedir?', type: 'select', options: ['Aksiyon', 'Komedi', 'Dram', 'Bilim Kurgu', 'Korku', 'Animasyon', 'Belgesel', 'Diğer'] },
        { id: uuidv4(), text: 'En sevdiğiniz yönetmen kimdir?', type: 'text' },
        { id: uuidv4(), text: 'En sevdiğiniz aktör/aktris kimdir?', type: 'text' },
        { id: uuidv4(), text: 'En son izlediğiniz film hangisiydi?', type: 'text' },
        { id: uuidv4(), text: 'Sinemada izlemeyi en çok sevdiğiniz film türü nedir?', type: 'select', options: ['Aksiyon', 'Komedi', 'Dram', 'Bilim Kurgu', 'Korku', 'Animasyon', 'Belgesel', 'Diğer'] },
        { id: uuidv4(), text: 'Hangi film müziklerini beğeniyorsunuz?', type: 'text' },
        { id: uuidv4(), text: 'En sevdiğiniz film repliği nedir?', type: 'text' },
        { id: uuidv4(), text: 'Hangi film karakteriyle özdeşleşiyorsunuz?', type: 'text' },
        { id: uuidv4(), text: 'Hangi film festivaline katılmak isterdiniz?', type: 'text' },
        { id: uuidv4(), text: 'Sinema deneyiminizi nasıl tanımlarsınız?', type: 'textarea' },
    ]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSurvey = {
            id: uuidv4(),
            title,
            questions,
        };

        const storedSurveys = localStorage.getItem('surveys');
        const surveys = storedSurveys ? JSON.parse(storedSurveys) : [];
        localStorage.setItem('surveys', JSON.stringify([...surveys, newSurvey]));
        navigate('/');
    };

    return (
        <div>
            <h2>Create Survey</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateSurvey;
